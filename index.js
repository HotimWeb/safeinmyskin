emailjs.init({ publicKey: "XBpGQiUTpFAbAfmeE" }); // <-- Add your EmailJS user ID here

document
  .getElementById("contact-form")
  .addEventListener("submit", function(event) {
    const f = document.getElementById("full_name")?.value;
    const email = document.getElementById("contact_email")?.value;
    const l = document.getElementById("phone_number")?.value;
    const p = document.getElementById("city_state")?.value;
    const y = document.getElementById("years_experince")?.value;
    const c = document.getElementById("company_name")?.value;
    const insta = document.getElementById("insta_url")?.value;
    const tik = document.getElementById("tik_url")?.value;
    const jp = document.getElementById("position")?.value;

    event.preventDefault(); // Prevent page reload

    // Get selected checkboxes for "How do you plan to share"
    let selectedShare = [];
    document
      .querySelectorAll('input[name="share_methods"]:checked')
      .forEach((checkbox) => {
        selectedShare.push(checkbox.value);
      });

    // Get selected checkboxes for "How would you like to get rewards"
    let selectedReward = [];
    document
      .querySelectorAll('input[name="reward_options"]:checked')
      .forEach((checkbox) => {
        selectedReward.push(checkbox.value);
      });

    // Get selected checkboxes for "terms and conditions"
    let termsCondition = [];
    document
      .querySelectorAll('input[name="agree_terms"]:checked')
      .forEach((checkbox) => {
        termsCondition.push(checkbox.value);
      });

    // Get selected checkboxes for "what best describes you"
    let bestDescribes = [];
    document
      .querySelectorAll('input[name="best_describe"]:checked')
      .forEach((checkbox) => {
        bestDescribes.push(checkbox.value);
      });

    // Get selected radio buttons
    const selectedSellChoice = document.querySelector(
      'input[name="sell_choice"]:checked',
    );
    const selectedRecommed = document.querySelector(
      'input[name="inte_rest"]:checked',
    );
    const stockSkincare = document.querySelector(
      'input[name="sims_someone"]:checked',
    );

    // Validation
    if (
      selectedShare.length === 0 ||
      selectedReward.length === 0 ||
      termsCondition.length === 0 ||
      bestDescribes.length === 0 ||
      !selectedSellChoice ||
      !selectedRecommed ||
      !stockSkincare
    ) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // ✅ Generate random code
    const generatedCode = generateRandomCode(10); // 10 characters long

    // Send data to EmailJS
    emailjs
      .send("service_gf5quyb", "template_054ngal", {
        destination: "safeinmyskinng@gmail.com",
        contact: true,
        f,
        email,
        l,
        p,
        y,
        c,
        insta,
        tik,
        jp,
        share_methods: selectedShare.join(", "),
        reward_options: selectedReward.join(", "),
        agree_terms: termsCondition.join(", "),
        best_describe: bestDescribes.join(", "),
        sell_choice: selectedSellChoice.value,
        inte_rest: selectedRecommed.value,
        sims_someone: stockSkincare.value,
        generated_code: generatedCode, // <-- pass the random code here!
      })
      .then(
        function(response) {
          // ✅ Display the code on the page
          document.getElementById("code-display").innerHTML = `
                🎉 Thank you! <br>
                Your personal code is: <span style="color: green;">${generatedCode}</span>
            `;
        },
        function(error) {
          alert("Failed to send email. Try again.");
        },
      );
  });

// 🔥 FUNCTION to generate a random code
function generateRandomCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
