const Route = use("Route");
const prefix = "api/v1";
const namespace = "Api/v1";

Route.group(() => {
  Route.post("auth/recover", "PasswordController.recover");
  Route.post("login", "UserController.login");
  Route.post("email", "UserController.validateEmail");
  Route.post("username", "UserController.validateUsername");
  Route.post("users", "UserController.store");
})
  .prefix(prefix)
  .namespace(namespace)
  .middleware("guest");

Route.group(() => {
  Route.get("me", "UserController.me");
  Route.get("users/likes-balance", "UserController.likesBalance");
  Route.get("users/points", "UserController.pointsBalance");
  Route.get("users/:id", "UserController.show");
  Route.put("users", "UserController.update");
  Route.get("songs/:page?", "SongController.index");
  Route.post("songs/:id/like", "LikeController.store");
  Route.post(
    "songs/:id/offensive-report",
    "OffensiveSongReportController.store"
  );
  Route.get("likes", "LikeController.index");
  Route.get("store-items/:page?", "StoreItemController.index");
  Route.get("store-items/show/:id", "StoreItemController.show");
  Route.post("store-items/purchase", "StorePurchaseController.store");
  Route.post("subscriptions/upgrade", "SubscriptionController.upgrade");
  Route.post("purchase-updates/verify", "PurchaseReceiptController.verify");
})
  .prefix(prefix)
  .namespace(namespace)
  .middleware("auth");

Route.group(() => {
  Route.post("image-files/store", "ImageFileController.store");
  Route.post("audio-files/store", "AudioFileController.store");
})
  .prefix(prefix)
  .namespace(namespace)
  .middleware("auth:session");
