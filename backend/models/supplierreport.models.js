module.exports = (supplier) => {
  const today = new Date()
  // const supplierCount = supplier.length
  console.log(supplier)
  // const total = 0

  return `
      
      <!doctype html>
      <html lang="en">
  
      <head>
  
      <meta charset="utf-8">
      <titel></titel>
      <style>
      
      .clearfix:after {
          content: "";
          display: table;
          clear: both;
        }
        
        a {
          color: #5D6975;
          text-decoration: underline;
        }
        
        body {
          position: relative;
          width: 21cm;  
          height: 29.7cm; 
          margin: 0 auto; 
          color: #001028;
          background: #FFFFFF; 
          font-family: Arial, sans-serif; 
          font-size: 12px; 
          font-family: Arial;
        }
        
        header {
          padding: 10px 0;
          margin-bottom: 30px;
        }
        
        #logo {
          text-align: center;
          margin-bottom: 10px;
        }
        
        #logo img {
          width: 400px;
        }
        
        h1 {
          border-top: 1px solid  #5D6975;
          border-bottom: 1px solid  #5D6975;
          color: #5D6975;
          font-size: 2.4em;
          line-height: 1.4em;
          font-weight: normal;
          text-align: center;
          margin: 0 0 20px 0;
          background: url(dimension.png);
        }
        
        #project {
          float: left;
        }
        
        #project span {
          color: #5D6975;
          text-align: right;
          width: 52px;
          margin-right: 10px;
          display: inline-block;
          font-size: 0.8em;
        }
        
        #company {
          float: right;
          text-align: right;
        }
        
        #project div,
        #company div {
          white-space: nowrap;        
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
          margin-bottom: 20px;
        }
        
        table tr:nth-child(2n-1) td {
          background: #F5F5F5;
        }
        
        table th,
        table td {
          text-align: center;
        }
        
        table th {
          padding: 5px 20px;
          color: #5D6975;
          border-bottom: 1px solid #C1CED9;
          white-space: nowrap;        
          font-weight: normal;
        }
        
        table .service,
        table .desc {
          text-align: left;
        }
        
        table td {
          padding: 20px;
          text-align: right;
        }
        
        table td.service,
        table td.desc {
          vertical-align: top;
        }
        
        table td.unit,
        table td.qty,
        table td.total {
          font-size: 1.2em;
        }
        
        table td.grand {
          border-top: 1px solid #5D6975;;
        }
        
        #notices .notice {
          color: #5D6975;
          font-size: 1.2em;
        }
        
        footer {
          color: #5D6975;
          width: 100%;
          height: 30px;
          position: absolute;
          bottom: 0;
          border-top: 1px solid #C1CED9;
          padding: 8px 0;
          text-align: center;
        }
      
      </style>
  
      </head>
  
      <body>
  
      <header class="clearfix">
      <div id="logo">
        <img src="http://localhost:3000/logo.png" height="100px">
      </div>
      <!-- <h1><b>Nandana Tea</b></h1> -->
      <h1>Supplier Details</h1>
  
      <div id="company" class="clearfix">
        <div>Nandana Tea PVT LTD</div>
        <div>Matara<br /> No 85004, Srilanka</div>
        <div>04122#####</div>
        <div><a href="#">sashintha27@gmail.com</a></div>
      </div>
      <div id="project">
        <div><span>Position</span>Stock Manager</div>
        <div><span>Name</span>Sashintha Kaushalya</div>
       
        <div><span>EMAIL</span> <a href="#">nandanatea@gmail.com</a></div>
        <div><span>DATE</span>${`${today}`}</div>
       
       
      </div>
    </header>
    <main>
      <table>
        <thead>
          <tr>
            <th>Supplier ID</th>
            <th>Supplier Name</th>
            <th>Supplier Email</th>
            <th>Supplier Contact</th>
            <th>Supplier Company</th>
            
          </tr>
        </thead>
        <tbody>
  
       ${supplier.map((sup) => {
          return (
              `   <tr>
              <td class="service">${sup.supID}</td>
              <td class="desc">${sup.sname}</td>
              <td class="desc">${sup.semail}</td>
              <td class="desc">${sup.scontact}</td>
              <td class="unit">${sup.scompany}</td>
              <!-- <td class="unit"></td>
              <td class="unit">${sup.scompany}</td> -->
               
              </tr> `

          )
       })}  
        </tbody>
      </table>
     
      <div id="notices"> 
      </div>
    </main>
    <footer>
    </footer>
      </body>
      </html>
      `
}
