async function test() {
  const response = await fetch("https://formsubmit.co/ajax/madudimcjx@gmail.com", {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'https://vervedentist.com',
      'Referer': 'https://vervedentist.com/'
    },
    body: JSON.stringify({
      _subject: `Urgent: New Dental Lead Captured - Test Name`,
      name: "VerveDentist AI Assistant",
      lead_name: "Test Name",
      lead_phone: "1234567890",
      message: "This is a test transcript test test."
    })
  });
  console.log(response.status);
  const data = await response.json();
  console.log(data);
}
test();
