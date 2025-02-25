export const invoiceHTML = () => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice</title>
        <style>
          body { font-family: Helvetica, Arial, sans-serif; margin: 20px; }
          header { display: flex; justify-content: space-between; }
          .company-info { font-size: 20px; }
          .invoice-details { text-align: right; }
          hr { border: none; border-top: 2px solid #000; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
          th { background-color: #007BFF; color: #FFF; }
          tr:nth-child(even) { background-color: #F8F9FA; }
          .summary { display: flex; justify-content: space-between; margin-top: 20px; }
          .footer { text-align: center; margin-top: 40px; font-style: italic; color: #007BFF; }
        </style>
      </head>
      <body>
        <header>
          <div class="company-info">
            <strong>Company Name</strong><br>
            567 Street Name<br>
            City, State ZIP Code<br>
            Country
          </div>
          <div class="invoice-details">
            <h2>Invoice</h2>
            Invoice Number: 00001<br>
            Date of Issue: mm/dd/yyyy
          </div>
        </header>
        <hr>
        <section>
          <strong>Billed To:</strong><br>
          Your Client<br>
          Street Address<br>
          City, State ZIP Code<br>
          Country
        </section>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Unit Cost</th>
              <th>QTY/HR RATE</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Item name</td>
              <td>$0</td>
              <td>1</td>
              <td>$0</td>
            </tr>
            <tr>
              <td>Item name</td>
              <td>$0</td>
              <td>1</td>
              <td>$0</td>
            </tr>
            <tr>
              <td>Item name</td>
              <td>$0</td>
              <td>1</td>
              <td>$0</td>
            </tr>
            <tr>
              <td>Item name</td>
              <td>$0</td>
              <td>1</td>
              <td>$0</td>
            </tr>
            <tr>
              <td>Item name</td>
              <td>$0</td>
              <td>1</td>
              <td>$0</td>
            </tr>
          </tbody>
        </table>
        <div class="summary">
          <div>
            Terms:<br>
            Net 30
          </div>
          <div>
            Subtotal: $0<br>
            Discount: $0<br>
            (Tax Rate) 0%: $0<br>
            Tax: $0<br>
            <hr>
            <strong>Invoice Total: $5000</strong>
          </div>
        </div>
        <div class="footer">
          Thank you for your business!
        </div>
      </body>
      </html>
    `
}
