
/*gbo add */
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
   
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
    
  var month = months[a.getMonth()];
  var date = a.getDate();
  
  var time = date + ' ' + month + ' ' + year ;
  return time;
}

/* global instantsearch algoliasearch */

const search = instantsearch({
  indexName: 'Concerts',
  searchClient: algoliasearch('3962YUZC7E', '3bebd61f4b5d8929925b6eb8bd5aecd3'),
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  

  instantsearch.widgets.hits({
    container: '#hits',
    
    transformItems: items => items.map(item => ({ ...item,
        date: timeConverter(item.date)
                                                 
    })),
      
    templates: {
      item: `
        <div>
          
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>
          <div class="hit-description">
            {{#helpers.highlight}}{ "attribute": "location" }{{/helpers.highlight}}
          </div>
            

          <div class="hit-description">
            {{date}}
          </div>
          
        </div>
      `,
     
     
        
        
        
        
        
        
        
        
        
        
        
    },
    
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
