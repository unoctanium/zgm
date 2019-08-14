/*
  Menu is an array of Header, Divider and MenuEntry
  Header: 
  { header: "Apps" } // Produces a heading line in the drawer
  Divider: 
  { divider: true} // Produces a heading line in the drawer^
  MenuEntry: // One menu entry in the drawer
  {
      title: "Dashboard", // Title/Text to show in the Menubar
      icon: "dashboard", // Icon to show in  the Menubar. Optional
      disabled: {type: boolean, default:null} // optional // true: disable menu item
      active: {type: boolean, default:null} // optional // used wirh v-model. becomes true/false on activation/deactivation
      target: null, // optional, i.e. "_blank"

      // Navigation variants will be used in this priority. i.e., 
      // if there are sub-items, routing will be ignored and
      // if there is a href, the other two options (named_route and path_route) will be ignored

      // Variant 1: Submenu-opener
      items: [ ... ] // sub-items with same rules like MenuEntry // optional // default null // if provided, the route-options of the parent-menu-line are ignored

      // Route variant 1: <a></a>
      href: "https://somewhere.com", // default: null
      
      // Route variant 2: Named route
      named_route: "ANamedRoute", // produces to="{ name:'ANamedRoute'}" // default: null

      // Route variant 3: Path-Route
      path_route: "a/path", // produces to="a/path" // default: null
    }
*/

const Menu = [
    { header: "Apps" },
    {
      title: "Dashboard",
      icon: "dashboard",
      named_route: "Dashboard"
    },
    { divider: true},
    {
      title: "Test Collection Detail",
      icon: "view_quilt",
      named_route: "TestCollectionDetail"
    },
    {
      title: "Test Collection Report",
      icon: "view_list",
      named_route: "TestCollectionReport"      
    },
    { divider: true},
    {
      title: "ListWidget",
      icon: "widgets",
      named_route: "ListWidget"      
    },
    {
      title: "Widgets",
      icon: "widgets",
      items: [
        { title: "Social", 
          icon: "widgets",
          component: "SocialWidget",
        },
        { title: "List", 
          icon: "widgets",
          path_route: "/widgets/list"
        }
      ]
    },
    { header: "SOME HEADER" },
    {
      title: "List & Query",
      icon: "view_compact"
    },
    { divider: true },
    { header: "HEADING"},
    { title: 'I am a link', icon: 'history', target: "_blank", href: "http://www.welt.de" },
    { title: 'I am disabled', icon: 'help', disabled: true },
    { title: 'I am dis and href', icon: 'help', path_route: '/a', disabled: true },
    { title: 'I am href', icon: 'help', path_route: '/b' },
    { divider: true },
    { header: "HEADING2"},
    { title: 'wasting space', icon: 'help', items: [
        { title: 'blah1', icon: 'help' },  
        { title: 'blah2', icon: 'help' },  
        { title: 'blah3', icon: 'help' },  
        { title: 'blah4', icon: 'help' },  
        { title: 'blah5', icon: 'help' },  
        { title: 'blah6', icon: 'help' },  
        { title: 'blah7', icon: 'help' },  
        { title: 'blah8', icon: 'help' }  
      ]
    },
    { title: 'Last', icon: 'help', path_route: '/z' },



  ]

  export default Menu



