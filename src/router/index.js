import Vue from 'vue'
import Router from 'vue-router'
import IndexContainer from '@/components/indexContainer'
import Home from '@/components/index/home'
import IndexLeft from '@/components/index/indexLeft'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'IndexContainer',
      component: IndexContainer,
      children: [
        {
          path: '/',
          // name: 'Home',
          alias: '/index',
          component: Home,
          children: [
            {
              name: 'IndexLeft',
              path: '/',
              alias: '/index',
              component: IndexLeft,
            },
            {
              name: 'articleDetails',
              path: '/articleDetails/:id',
              component: () => import ('@/components/index/articleDetails'),
            },
            {
              name: 'trend',
              path: '/trend',
              component: () => import ('@/components/index/trend'),
            },
            {
              name: 'live',
              path: '/live',
              component: () => import ('@/components/index/live'),
            },
            {
              name: 'footerDetails',
              path: '/footerDetails/:identification',
              component: () => import ('@/components/index/footerDetails'),
            }
          ]
        },
        {
          path: 'Data',
          name: 'Data',
          component: () => import ('@/components/dataContainer/dataContainer'),
          children: [
            {
              path: 'historyData',
              name: 'historyData',
              component: () => import ('@/components/dataContainer/historyData/historyData')
            },
            {
              path: 'numberPlan',
              name: 'numberPlan',
              component: () => import ('@/components/dataContainer/numberPlan/numberPlan')
            },
            {
              path: 'trendChart',
              name: 'trendChart',
              component: () => import ('@/components/dataContainer/trendChart/trendChart')
            },
            {
              path: 'hotNumber',
              name: 'hotNumber',
              component: () => import ('@/components/dataContainer/hotNumber/hotNumber')
            },
            {
              path: 'luZhu',
              name: 'luZhu',
              component: () => import ('@/components/dataContainer/louZhu/louZhu')
            },
            {
              path: 'liveVideo',
              name: 'liveVideo',
              component: () => import ('@/components/dataContainer/liveVideo/liveVideo'),
              children: [
                {
                  path: 'ssc/:code',
                  name: 'ssc',
                  component: () => import ('@/components/dataContainer/liveVideo/ssc')
                },
                {
                  path: 'pk10/:code',
                  name: 'pk10',
                  component: () => import ('@/components/dataContainer/liveVideo/pk10')
                },
                {
                  path: 'very_happy/:code',
                  name: 'very_happy',
                  component: () => import ('@/components/dataContainer/liveVideo/very_happy')
                },
                {
                  path: 'xync/:code',
                  name: 'xync',
                  component: () => import ('@/components/dataContainer/liveVideo/xync')
                },
                {
                  path: 'fast3/:code',
                  name: 'fast3',
                  component: () => import ('@/components/dataContainer/liveVideo/fast3')
                },
                {
                  path: '11x5/:code',
                  name: '11x5',
                  component: () => import ('@/components/dataContainer/liveVideo/11x5')
                },
                {
                  path: 'fc_tc/:code',
                  name: 'fc_tc',
                  component: () => import ('@/components/dataContainer/liveVideo/fc_tc')
                },
              ],
            }
          ],
        },

      ]
    },
    {
      name: 'forecastOverview',
      path: '/forecastOverview',
      component: () => import ('@/components/forecastOverview'),
    },
    {
      path: '/page404',
      name: 'page404',
      component: () => import ('@/components/base/page404')
    },
    {
      path: '/page408',
      name: 'page408',
      component: () => import ('@/components/base/page408')
    },
    // test
    {
      path: '/test',
      component: () => import ('@/components/loading'),
    }
  ]
})
