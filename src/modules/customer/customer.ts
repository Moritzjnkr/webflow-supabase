import { WFComponent, WFFormComponent } from "@xatom/core";
import { logout, userAuth } from "../auth";
import supabase from "../supbase";

const renderLogoutBtn = () => {
  // Logout button
  const btn = new WFComponent(`[xa-type=cta-btn]`);
  btn.on("click", (e) => {
    e.preventDefault();
    btn.setTextContent("...");
    logout();
  });
  btn.setTextContent("Logga ut");
};

// Customer Interface
interface Customer {
  id: string;
  First_name: string;
  Last_name: string;
  gatuadress: string;
  postnummer: string;
  postort: string;
  email: string;
  phone: string;
  clearingnumber: number | null;
  bankaccountnumber: number | null;
}

export const customerDetails = async () => {
  renderLogoutBtn();

  const userId = userAuth.getUser().id;
  const customerDetailsContainer = new WFComponent(`[xa-type="customer-details"]`);
  const form = new WFFormComponent<{ clearingnumber: number; bankaccountnumber: number }>(
    `[xa-type="bank-form"]`
  );

  let customer: Customer | null = null;

  // Fetch and Render Customer Details
  try {
    const { data, error } = await supabase
      .from("Customer")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      customerDetailsContainer.setHTML("<p>No active customer found.</p>");
      return;
    }

    customer = data as Customer;

    // Update Text Content for static fields
    const { firstname, lastname, adress, postalcode, postalort, uppgiftemail, uppgiftphone } =
      customerDetailsContainer.getManyChildAsComponents({
        firstname: "[xa-type=firstname]",
        lastname: "[xa-type=lastname]",
        adress: "[xa-type=adress]",
        postalcode: "[xa-type=postalcode]",
        postalort: "[xa-type=postalort]",
        uppgiftemail: "[xa-type=uppgiftemail]",
        uppgiftphone: "[xa-type=uppgiftphone]",
      });

    firstname.setTextContent(customer.First_name);
    lastname.setTextContent(customer.Last_name);
    adress.setTextContent(customer.gatuadress);
    postalcode.setTextContent(customer.postnummer);
    postalort.setTextContent(customer.postort);
    uppgiftemail.setTextContent(customer.email);
    uppgiftphone.setTextContent(customer.phone);

    // Set input fields for numeric bank details using `value`
    const clearingInput = document.querySelector<HTMLInputElement>(`[xa-type="clearingnumber"]`);
    const accountInput = document.querySelector<HTMLInputElement>(`[xa-type="bankaccountnumber"]`);

    if (clearingInput) clearingInput.value = customer.clearingnumber?.toString() || "";
    if (accountInput) accountInput.value = customer.bankaccountnumber?.toString() || "";

    
    form.onFormSubmit(async (formData) => {
      form.disableForm(); // Disable the form to prevent multiple submissions
    
      const clearingNumberValue = formData.clearingnumber;
      const bankAccountNumberValue = formData.bankaccountnumber;
    
      try {
        const { data: updatedData, error } = await supabase
          .from("Customer")
          .update({
            clearingnumber: clearingNumberValue,
            bankaccountnumber: bankAccountNumberValue,
          })
          .eq("user_id", userId)
          .select();  // Explicitly select the updated rows
    
        if (error) {
          console.error("Error updating customer data:", error.message);
          form.showErrorState(); // Custom error message
        } else {
          console.log("Customer data updated successfully", updatedData);
          form.showSuccessState(); // Custom success message
          
          const successMessage = document.querySelector<HTMLDivElement>(`[xa-type="success-message"]`);
          if (successMessage) {
            successMessage.style.display = "block";
    
            let countdown = 3;
            const countdownSpan = document.getElementById("countdown");
            const interval = setInterval(() => {
              countdown -= 1;
              if (countdownSpan) countdownSpan.textContent = countdown.toString();
    
              if (countdown <= 0) {
                clearInterval(interval);
                location.reload(); // Reload the page after countdown
              }
            }, 1000); // Reduce countdown every second
          }
        }
      } catch (updateError) {
        console.error("Error during form submission:", updateError.message);
        form.showErrorState();
      } finally {
        form.enableForm(); // Re-enable the form after submission
      }
    });
    
  } catch (error) {
    console.error("Error fetching customer details:", error);
    customerDetailsContainer.setHTML("<p>Error fetching customer data.</p>");
  }
};

customerDetails();