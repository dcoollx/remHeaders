container.find('ol > li').map(
  //--Iterate through all menu headings-----
  function(i)
  {
    //--Get the link of the menu item, find links within submenu using iterator-----
    return {elem : $ae(this).children('a'), items: $ae('aside.mainNavMegaMenu').eq(i).find('ol').first().children('li.level1').map( //DQ 9:58 this had to be a find but i made it limit to the first it finds
      function()
      {
        if($ae(this).children('ol').length <= 0)
        {
          return {elem : $ae(this).children('h4').find('a')}
        }
        else
        {
          //--Return the links of the subsubmenus as the element-----
          return {elem : $ae(this).children('h4').find('a'), items: $ae(this).find('ol').children('li').map(function(){
            return {elem : $ae(this).children('a'))};
          }).toArray()
                 }; 
        }
      }).toArray()
           };
  }).toArray()