import { createSignal, createEffect, createMemo } from "solid-js";

const [firstName, setFirstName] = createSignal("Eric");
const [lastName, setLastName] = createSignal("Butler");

console.info("Adding an effect for when name changes:");
createEffect(() => {
  console.info(`Users name is: ${firstName()} ${lastName()}`);
});

// sometime later, Eric gets married
setTimeout(() => {
  setLastName("Kim-Butler");
}, 2_000);

function sendEmail(subject: string) {
  console.info(`Sending email with subject: ${subject}`);
}

const [licenseExpiry, setLicenseExpiry] = createSignal(new Date(2025, 0, 1));
const [now, setNow] = createSignal(new Date());
setInterval(() => setNow(new Date()), 1_000);

const isCompliant = createMemo(() => now() < licenseExpiry());

createEffect(() => {
  console.info("Checking compliance:", isCompliant());
  if (!isCompliant()) {
    sendEmail("Please update your license");
  }
});

setTimeout(() => {
  setLicenseExpiry(new Date(2020, 0, 1));
}, 5_000);
