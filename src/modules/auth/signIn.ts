import { WFFormComponent, navigate } from "@xatom/core";
import supabase from "../supbase";
import { SUPABASE_REDIRECT_URL } from "../../config";

export const signIn = () => {
  // Initialize the form component
  const form = new WFFormComponent<{
    email: string;
  }>(`[xa-type=main-form]`);
/*
  // Google login button handling
  const googleBtn = form.getChildAsComponent(`[xa-type="google-btn"]`);
  googleBtn.on("click", () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: SUPABASE_REDIRECT_URL,
      },
    });
  });
*/
  // Form submission for magic link
  form.onFormSubmit((data) => {
    form.showForm();
    form.disableForm();
    form.updateSubmitButtonText("Sending Magic Link...");

    // Call Supabase auth to send a magic link
    supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        // Set to false if you do not want automatic sign-up
        shouldCreateUser: false,
        emailRedirectTo: SUPABASE_REDIRECT_URL,
      },
    }).then((response) => {
      if (response.error) {
        form.updateTextViaAttrVar({
          error: response.error.message || "Unable to send magic link, please try again",
        });
        form.showErrorState();
        form.updateSubmitButtonText("Send Magic Link");
        return;
      }

      // Notify user to check their email for the magic link
      form.updateSubmitButtonText("Check your email for the magic link");
      navigate("/auth/check-email"); // Redirect to a check email page or similar
    }).catch((err) => {
      form.updateTextViaAttrVar({
        error: err.message || "Unable to send magic link, please try again",
      });
      form.showErrorState();
      form.updateSubmitButtonText("Send Magic Link");
    }).finally(() => {
      form.enableForm();
    });
  });
};