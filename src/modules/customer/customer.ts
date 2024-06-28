import { WFComponent } from "@xatom/core";
import { logout, userAuth } from "../auth";
import supabase from "../supbase";

const renderLogoutBtn = () => {
  //logout button
  const btn = new WFComponent(`[xa-type=cta-btn]`);
  //on click setting up button text and calling logout function
  btn.on("click", (e) => {
    e.preventDefault();
    btn.setTextContent("Please wait...");
    logout();
  });
  //changing create account text to logout text
  btn.setTextContent("Logga ut");
};

// Order Interface (Modify types as needed)
interface Customer {
  id: string;
  First_name: string;
  Last_name: string;
  gatuadress: string;
  postnummer: string;
  postort: string;
  email: string;
  phone: string;
}

export const customerDetails = async () => {
  renderLogoutBtn(); 
  
  const userId = userAuth.getUser().id;
  const customerDetailsContainer = new WFComponent(`[xa-type="customer-details"]`);

  let customer: Customer | null = null;

  // Fetch and Render Order Details (Combined)
  try {
    const { data, error } = await supabase
      .from("Customer")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      customerDetailsContainer.setHTML("<p>No active order found.</p>");
      return;
    }

    customer = data as Customer; 
    
    // Update Text Content using a similar approach to the working code
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
    
    //Update inner text of the elements
    firstname.setTextContent(customer.First_name);
    lastname.setTextContent(customer.Last_name);
    adress.setTextContent(customer.gatuadress);
    postalcode.setTextContent(customer.postnummer);
    postalort.setTextContent(customer.postort);
    uppgiftemail.setTextContent(customer.email);
    uppgiftphone.setTextContent(customer.phone);



  } catch (error) {
    console.error("Error fetching order details or status:", error);
    // Handle error appropriately
  }

      


  
};

customerDetails();
