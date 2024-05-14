import { WFComponent } from "@xatom/core";
import { logout, userAuth } from "../auth"; // Import for potential future auth checks
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
  btn.setTextContent("Logout");
};

export const orderList = () => {
    renderLogoutBtn();
    // Get references to elements using xa-types (these must exist in your HTML)
    const tableHeaders = new WFComponent(`[xa-type="table-headers"]`);
    const listContainer = new WFComponent(`[xa-type="order-list"]`); 

    // Fetch the order data from Supabase
    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from("orders")
                .select("*"); 
            
            if (error) throw error; 

            renderOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error.message);
            // Consider displaying an error message to the user here
        }
    };

    // Function to render order data into the HTML
    const renderOrders = (orders) => {
        listContainer.removeAllChildren(); // Clear previous content

        for (const order of orders) {
            // Create a new row element for each order
            const row = new WFComponent(`<div xa-type="order-item"></div>`);

            // Update text content within the row using xa-types
            row.updateTextViaAttrVar({
                "order-id": order.order_id,
                "order-date": order.order_date,
                "valuation-number": order.valuation_number,
                "amount": order.amount,
                // ... (add other fields as needed)
            });

            listContainer.appendChild(row);
        }
    };

    // Initial fetch of order data when the page loads
    fetchOrders();
};
