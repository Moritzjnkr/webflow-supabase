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
interface Order {
  id: string;
  user_id: string;
  order_id: string;
  is_complete: boolean;
  order_date: string;
  valuation_number: string;
  amount: number;
  cancellation_right_period: string;
  total_gram_purchased: number;
  recipe_download_link: string;
  barcodeid: number;
}

export const orderDetails = async () => {
  renderLogoutBtn(); 
  
  const userId = userAuth.getUser().id;
  const orderDetailsContainer = new WFComponent(`[xa-type="order-details"]`);

  let order: Order | null = null;

  // Fetch and Render Order Details (Combined)
  try {
    const { data, error } = await supabase
      .from("Order")
      .select("*")
      .eq("user_id", userId)
      .eq("is_complete", false) 
      .single();

    if (error || !data) {
      orderDetailsContainer.setHTML("<p>No active order found.</p>");
      return;
    }

    order = data as Order; 

    
    // Update Text Content using a similar approach to the working code
    const { bestallning, datum, varderingsnummer, summa, angeratt, totalgrampurchased, kvittolink} = 
        orderDetailsContainer.getManyChildAsComponents({
        kvittolink: "[xa-type=pdf-link]",
        bestallning: "[xa-type=bestallning]",
        datum: "[xa-type=datum]",
        varderingsnummer: "[xa-type=varderingsnummer]",
        summa: "[xa-type=summa]",
        angeratt: "[xa-type=angerrätt]",
        totalgrampurchased: "[xa-type=totalgrampurchased]",
    });
    
    //Update inner text of the elements
    bestallning.setTextContent(order.barcodeid.toFixed(0));
    datum.setTextContent(order.order_date);
    varderingsnummer.setTextContent(order.valuation_number);
    summa.setTextContent(order.amount != null ? order.amount.toFixed(2) : "0.00");
    angeratt.setTextContent(order.cancellation_right_period);
    totalgrampurchased.setTextContent(order.total_gram_purchased != null ? order.total_gram_purchased.toFixed(2) : "0.00");
    kvittolink.setAttribute("href", order.recipe_download_link);

    const { data: statusData, error: statusError } = await supabase
    .from("order_status")
    .select("*")
    .eq("order_id", order.id)  // Filter by the Order's id (primary key)
    .order("created_at", { ascending: false }) // Get the latest status
    .single();

      if (statusError) {
          console.error("Error fetching order status:", statusError);
          return;
      }

      const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
    
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

      const step = statusData.step || 1;
      const substep = statusData.substep || 1;
      const kuvertMottagen = statusData.kuvert_mottagen ? formatDateTime(statusData.kuvert_mottagen) : "Not available";

      // Update elements with the step and substep information
      const stepElement = new WFComponent(`[xa-type="step"]`);
      stepElement.setTextContent(`${step}`);

      const substepElement = new WFComponent(`[xa-type="substep"]`);
      substepElement.setTextContent(`${substep}`);

      // Update the kuvert_mottagen element with the date
      const kuvertMottagenElement = new WFComponent(`[xa-type="kuvertmottagen"]`);
      kuvertMottagenElement.setTextContent(kuvertMottagen);

  } catch (error) {
    console.error("Error fetching order details or status:", error);
    // Handle error appropriately
  }

      


  
};

orderDetails();
