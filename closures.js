var gLogNumber, gIncreaseNumber, gSetNumber;
function setupSomeGlobals() {
    // Local variable that ends up within closure
    var num = 42;
    // Store some references to functions as global variables
    gLogNumber = function() { console.log(num); }
    gIncreaseNumber = function() { num++; }
    gSetNumber = function(x) { num = x; }
}

setupSomeGlobals();
gIncreaseNumber();
gLogNumber(); // 43
gSetNumber(5);
gLogNumber(); // 5

var oldLog = gLogNumber;

setupSomeGlobals();
gLogNumber(); // 42

oldLog()
