var cheerio = require("cheerio"); // Parses our HTML and helps us find elements
var request = require("request"); // Makes HTTP request for HTML page

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing ICD-10-CM Codes and Info for Gender identity disorder diagnoses\n" +
            "Listed under F64- Gender identity disorders ›" +
            "\n***********************************\n");

var results = [];
var f64Sites = ["https://www.icd10data.com/ICD10CM/Codes/F01-F99/F60-F69/F64-/F64.0",
                "https://www.icd10data.com/ICD10CM/Codes/F01-F99/F60-F69/F64-/F64.1",
                "https://www.icd10data.com/ICD10CM/Codes/F01-F99/F60-F69/F64-/F64.2",
                "https://www.icd10data.com/ICD10CM/Codes/F01-F99/F60-F69/F64-/F64.8",
                "https://www.icd10data.com/ICD10CM/Codes/F01-F99/F60-F69/F64-/F64.9"
                ]

request(f64Sites[0], function(error, response, html) {
  var $ = cheerio.load(html);

  $("h1.pageHeading").each(function(i, element) {
    var title = $(element).children().text();
    results.push({
      title: title,
    });
  });

  $("h2.codeDescription").each(function(i, element) {
    var description = $(element).text();
    results.push({
      description: description,
    });
  });
});


request(f64Sites[1], function(error, response, html) {
  var $ = cheerio.load(html);
  
  $("h1.pageHeading").each(function(i, element) {
    var title = $(element).children().text();
    results.push({
      title: title,
    });
  });

  $("h2.codeDescription").each(function(i, element) {
    var description = $(element).text();
    results.push({
      description: description,
    });
  });
});

request(f64Sites[2], function(error, response, html) {
  var $ = cheerio.load(html);

  $("h1.pageHeading").each(function(i, element) {
    var title = $(element).children().text();
    results.push({
      title: title,
    });
  });

  $("h2.codeDescription").each(function(i, element) {
    var description = $(element).text();
    results.push({
      description: description,
    });
  });
});

request(f64Sites[3], function(error, response, html) {
  var $ = cheerio.load(html);

  $("h1.pageHeading").each(function(i, element) {
    var title = $(element).children().text();
    results.push({
      title: title,
    });
  });

  $("h2.codeDescription").each(function(i, element) {
    var description = $(element).text();
    results.push({
      description: description,
    });
  });
});

request(f64Sites[4], function(error, response, html) {
  var $ = cheerio.load(html);

  $("h1.pageHeading").each(function(i, element) {
    var title = $(element).children().text();
    results.push({
      title: title,
    });
  });

  $("h2.codeDescription").each(function(i, element) {
    var description = $(element).text();
    results.push({
      description: description,
    });
  });
// });

  console.log(results);
});

