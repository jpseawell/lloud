"use strict";

const moment = require("moment");

const Env = use("Env");
const Event = use("Event");

const appUrl = Env.get("APP_URL");

const { validate } = use("Validator");
const User = use("App/Models/User");

class PasswordController {
  async recover({ request, response }) {
    const rules = {
      email: "required|email",
    };

    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      return validation.messages();
    }

    let user;
    try {
      user = await User.findByOrFail(request.only(["email"]));
    } catch (err) {
      return response.notFound({ success: false, message: "User not found." });
    }

    user.generatePasswordReset();
    await user.save();

    Event.fire("user::recover_password", user, appUrl);

    return response.ok({ success: true, message: "Password recovery email sent." })
  }

  async reset({ params, request, response, view }) {
    try {
      const user = await User.findByOrFail(
        "resetPasswordToken",
        `${params.resetToken}`
      );

      const isExpired = moment().isAfter(user.resetPasswordExpires);
      if (isExpired) {
        throw Error("Password reset token is expired.");
      }

      const viewData = {
        username: user.username,
        resetToken: params.resetToken,
      };

      return view.render("password-reset-form", viewData);
    } catch (err) {
      return view.render("external-error", {
        errMsg: "Password reset token is invalid or has expired.",
      });
    }
  }

  async resetPassword({ params, request, response, view }) {
    const user = await User.findByOrFail(
      "resetPasswordToken",
      `${params.resetToken}`
    );

    const isExpired = moment().isAfter(user.resetPasswordExpires);
    if (isExpired) {
      return view.render("external-error", {
        errMsg: "Password reset token is invalid or has expired.",
      });
    }

    const rules = {
      password: "required",
    };

    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(["password"]);

      return response.redirect("back");
    }

    const validData = request.only(["password"]);

    user.password = validData.password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    Event.fire("user::password_was_reset", user);

    return view.render("password-recovered");
  }
}

module.exports = PasswordController;
