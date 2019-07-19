const Menu = [
    { header: "Apps" },
    {
      name: "Dashboard",
      title: "Dashboard",
      group: "apps",
      icon: "dashboard",
      mini: true
    },
    {
      name: "ListWidget",
      title: "List", 
      component: "ListWidget",
      icon: "widgets",
      mini: true
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
        { name: "social", 
          title: "Social", 
          component: "SocialWidget",
          icon: "widgets"
        },
        {
          name: "statistic",
          title: "Statistic",
          badge: "new",
          component: "StatisticWidget",
          icon: "widgets"
        },
        { name: "chart", 
          title: "Chart", 
          component: "ChartWidget",
          icon: "widgets"
        },
        { name: "list", 
        title: "List", 
        component: "ListWidget",
        icon: "widgets"
        }
      ]
    },
    { header: "CMS" },
    {
      title: "List & Query",
      group: "layout",
      icon: "view_compact",
      items: [{ name: "Table", title: "Basic Table", component: "ListTable" }]
    }
  ]
  // reorder menu
  Menu.forEach(item => {
    if (item.items) {
      item.items.sort((x, y) => {
        let textA = x.title.toUpperCase()
        let textB = y.title.toUpperCase()
        return textA < textB ? -1 : textA > textB ? 1 : 0
      })
    }
  })
  
  export default Menu