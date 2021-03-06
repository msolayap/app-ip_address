
// import built-in module.
const path = require('path');

// import custom module's helper function into main's namespace
const { getIpv4MappedIpv6Address } = require(path.join(__dirname + "/ipv6.js"));
/*
  Import the ip-cidr npm package.
  See https://www.npmjs.com/package/ip-cidr
  The ip-cidr package exports a class.
  Assign the class definition to variable IPCIDR.
*/
const IPCIDR = require('ip-cidr');




class IpAddress {

    constructor() {

        log.info("Starting the IpAddresses Product")
    }

    /**
 * Calculate and return the first host IP address from a CIDR subnet.
 * @param {string} cidrStr - The IPv4 subnet expressed
 *                 in CIDR format.
 * @param {callback} callback - A callback function.
 * @return {string} (firstIpAddress) - An IPv4 address.
 */
 
    getFirstIpAddress(cidrStr, callback) {

    // Initialize return arguments for callback
    let firstIpAddress = null;
    let callbackError = null;
    let ipv6Address = null ;

    // Instantiate an object from the imported class and assign the instance to variable cidr.
    const cidr = new IPCIDR(cidrStr);
    // Initialize options for the toArray() method.
    // We want an offset of one and a limit of one.
    // This returns an array with a single element, the first host address from the subnet.
    const options = {
        from: 1,
        limit: 1
    };

    // Use the object's isValid() method to verify the passed CIDR.
    if (!cidr.isValid()) {
        // If the passed CIDR is invalid, set an error message.
        callbackError = 'Error: Invalid CIDR passed to getFirstIpAddress.';
        returnData = { 'ipv4' : null, 'ipv6' : null };
    } else {
        // If the passed CIDR is valid, call the object's toArray() method.
        // Notice the destructering assignment syntax to get the value of the first array's element.
        [firstIpAddress] = cidr.toArray(options);
        ipv6Address = getIpv4MappedIpv6Address(firstIpAddress) ;
        returnData = { 'ipv4' : firstIpAddress, 'ipv6' : ipv6Address };
    }
    // Call the passed callback function.
    // Node.js convention is to pass error data as the first argument to a callback.
    // The IAP convention is to pass returned data as the first argument and error
    // data as the second argument to the callback function.
    return callback(returnData, callbackError);
    }
}

module.exports = new IpAddress ;