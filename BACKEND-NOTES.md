# Google Apps Script backend – CORS and POST body

## Why we use `Content-Type: text/plain`

The frontend sends POST requests with **`Content-Type: text/plain`** (and the body is still JSON).  
This avoids a **CORS preflight** (OPTIONS request). Google Apps Script does not support OPTIONS and returns **405 Method Not Allowed**, so the browser would block the request if we used `application/json`.

## What your Apps Script must do

In **doPost(e)** you must read the raw body and parse JSON (because the body is JSON in a text/plain request):

```javascript
function doPost(e) {
  var data = {};
  if (e.postData && e.postData.contents) {
    data = JSON.parse(e.postData.contents);
  } else if (e.parameter) {
    data = e.parameter; // fallback for form-encoded
  }

  var action = data.action;
  if (action === "register") {
    // data.memberId, data.name, data.district, data.address, data.phone, data.company
    // ... append row to sheet ...
    return ContentService.createTextOutput("Success");
  }
  if (action === "update") {
    // data.memberId, data.field ("whatsapp" or "fee"), data.value
    // ... update sheet ...
    return ContentService.createTextOutput("Updated");
  }
  // ...
}
```

- **Register:** `action`, `memberId`, `name`, `district`, `address`, `phone`, `company`
- **Update:** `action`, `memberId`, `field` (`"whatsapp"` or `"fee"`), `value` (boolean)

Redeploy the Web App after changing the script.
