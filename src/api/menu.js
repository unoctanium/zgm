const Menu = [
    { header: "Apps" },
    {
      title: "Dashboard",
      icon: "dashboard",
      href: null,
      component: "Dashboard",
      routename: null,
      target: null,
      disabled: null
    },
    { divider: true},
    {
      title: "ListWidget",
      icon: "widgets",
      component: "ListWidget"
    },
    /*
    {
      title: "Chat",
      group: "apps",
      icon: "chat_bubble",
      target: "_blank",
      name: "Chat"
    },
    {
      title: "Inbox",
      group: "apps",
      name: "Mail",
      target: "_blank",
      icon: "email"
    },
    */
    {
      title: "Widgets",
      group: "widgets",
      component: "widgets",
      icon: "widgets",
      items: [
        { title: "Social", 
          icon: "widgets",
          routename: "widgets/social", 
          //component: "SocialWidget",
        },
        {
          title: "Statistic",
          icon: "widgets",
          component: "StatisticWidget",
          badge: "new",
        },
        { name: "chart", 
          title: "Chart", 
          component: "ChartWidget",
        },
        { title: "List", 
          icon: "widgets",
          routename: "widgets/list", 
        }
      ]
    },
    { header: "CMS" },
    {
      title: "List & Query",
      icon: "view_compact"
    },
    { title: 'Contacts', icon: 'contacts' },
    { title: 'I am a link', icon: 'history', target: "_blank", href: "http://www.welt.de" },
    {       
      title: 'More',
      icon: 'help',
      items: [
        { title: 'Import' },
        { title: 'Export' },
        { title: 'Print' },
        { title: 'Undo changes' },
        { title: 'Other contacts' }
      ]
    },
    { divider: true },
    { heading: "HEADING"},
    { title: 'Help', icon: 'help', disabled: true }

  ]

  // reorder menu
  /*
  Menu.forEach(item => {
    if (item.items) {
      item.items.sort((x, y) => {
        let textA = x.title.toUpperCase()
        let textB = y.title.toUpperCase()
        return textA < textB ? -1 : textA > textB ? 1 : 0
      })
    }
  })
  */

  export default Menu



