const resolveResponse = require("contentful-resolve-response");

let contentfulMiddleware = (data) => {
  let res = resolveResponse(data);
  // return res;
  return res.map((element) => {
    for (const property in element.fields) {
      if (Array.isArray(element.fields[property])) {
        element.fields[property] = element.fields[property].map((item) => {
          if (item.fields) return item.fields;
          else return item;
        });

        // for (const key in element.fields[property]) {
        //   if (Array.isArray(element.fields[property][key])) {
        //     element.fields[property][key] = element.fields[property][key].map(
        //       (item) => {
        //         if (item.fields) return item.fields;
        //         else return item;
        //       }
        //     );
        //   } else if (
        //     typeof element.fields[property][key] === "object" &&
        //     element.fields[property][key] !== null &&
        //     element.fields[property][key].fields
        //   ) {
        //     element.fields[property][key] =
        //       element.fields[property][key].fields;
        //   }
        // }
      } else if (
        typeof element.fields[property] === "object" &&
        element.fields[property] !== null &&
        element.fields[property].fields
      ) {
        element.fields[property] = element.fields[property].fields;
      }
    }
    return element.fields;
  });
};

module.exports = {
  contentfulMiddleware,
};
