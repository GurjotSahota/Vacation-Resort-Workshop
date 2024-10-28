"use strict";

let rates = [
  { type: "Queen", peakRate: 250, offRate: 150, maxGuests: 5 },
  { type: "King", peakRate: 250, offRate: 150, maxGuests: 2 },
  { type: "Suite", peakRate: 350, offRate: 210, maxGuests: 6 },
];

const bookingForm = document.getElementById("bookingForm");
const nights = document.getElementById("nights");
const checkInDate = document.getElementById("checkInDate");
const costDetails = document.getElementById("costDetails");

function getRoomRate(roomType, month) {
  const room = rates.find((r) => r.type === roomType);
  const isPeakSeason = month >= 5 && month <= 7;
  return isPeakSeason ? room.peakRate : room.offRate;
}

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const roomType = bookingForm.elements["roomType"].value;
  const numNights = parseInt(nights.value);
  const numAdults = parseInt(document.getElementById("adults").value);
  const numChildren = parseInt(document.getElementById("children").value);
  const discountType = bookingForm.elements["discountType"].value;
  const checkIn = new Date(checkInDate.value);
  const month = checkIn.getMonth();

  const room = rates.find((r) => r.type === roomType);
  const totalGuests = numAdults + numChildren;
  if (totalGuests > room.maxGuests) {
    costDetails.innerText = "The room you selected will not hold your party.";
    costDetails.classList.remove("hide");
    return;
  }

  const nightlyRate = getRoomRate(roomType, month);
  const baseCost = nightlyRate * numNights;

  let discountRate = 0;
  if (discountType === "AAA") discountRate = 0.1;
  if (discountType === "Military") discountRate = 0.2;
  const discountAmount = baseCost * discountRate;
  const discountedCost = baseCost - discountAmount;

  const taxAmount = discountedCost * 0.12;
  const totalCost = discountedCost + taxAmount;

  costDetails.innerHTML = `
    <p>Base Cost: $${baseCost.toFixed(2)}</p>
    <p>Discount: $${discountAmount.toFixed(2)}</p>
    <p>Discounted Cost: $${discountedCost.toFixed(2)}</p>
    <p>Tax: $${taxAmount.toFixed(2)}</p>
    <p>Total Cost: $${totalCost.toFixed(2)}</p>
  `;
  costDetails.classList.remove("hide");
});