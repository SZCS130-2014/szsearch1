var filter = ['ass','piss','fuck','shit','asshole','Ass','basterd','bitch','cock'];
function badWordCheck(txt){
      //var oldtxt = txt;
      // iterate over all words
      for(var i=0; i<filter.length; i++){

        // Create a regular expression and make it global
        var pattern = new RegExp('\\b' + filter[i] + '\\b', 'g');

        // Create a new string filled with '*'
        //var replacement = '*'.repeat(filter[i].length);

        txt = txt.replace(pattern, " ");
        console.log(txt);
      }
      console.log(txt);
      // returning txt will set the new text value for the current element
      return txt;
    
}
