import { WFRoute, navigate } from "@xatom/core";
import { userMiddleware } from "../modules/auth";

export const app = () => {
  // Handles all routes under /auth/*
  new WFRoute("/auth/(.*)")
    .withMiddleware(userMiddleware, "GUEST", "allow", {
      onError() {
        navigate("/mina-sidor/forsaljningar");  // Redirect to sign-in if there's an error in the auth route
      },
    })
    .execute(() => {
      // Route for signing up
      new WFRoute("/auth/sign-up").execute(() => {
        import("../modules/auth/signUp")
          .then(({ signUp }) => signUp())
          .catch(console.error);
      });

      // Route for signing in
      new WFRoute("/auth/sign-in").execute(() => {
        import("../modules/auth/signIn")
          .then(({ signIn }) => signIn())
          .catch(console.error);
      });

      // Route for verifying the magic link
      new WFRoute("/auth/verify").execute(() => {
        import("../modules/auth/verify")
          .then(({ verify }) => {
            verify();
            // Assume verification is handled internally, navigate after calling verify
            navigate("/mina-sidor/forsaljningar");  // Redirect to dashboard after attempting verification
          })
          .catch((error) => {
            console.error("Verification module failed to load", error);
            navigate("/auth/sign-in");  // Fallback redirect to sign-in on error
          });
      });
    });

  // Handles routes under /mina-sidor/*
  new WFRoute("/mina-sidor/(.*)")
    .withMiddleware(userMiddleware, "USER", "allow", {
      onError() {
        navigate("/auth/sign-in");  // Redirect to sign-in if user is not authenticated
      },
    })
    .execute(() => {
      // Specific dashboard route handling
      new WFRoute("/mina-sidor/forsaljningar").execute(() => {
        import("../modules/order/orderDetail")
          .then(({ orderDetails }) => orderDetails())
          .catch(console.error);
      });
      new WFRoute("/mina-sidor/kunduppgifter").execute(() => {
        import("../modules/customer/customer") // Adjust path as necessary
          .then(({ customerDetails }) => customerDetails())
          .catch(console.error);
      });
    });
};
