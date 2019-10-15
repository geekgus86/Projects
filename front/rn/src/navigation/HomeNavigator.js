import React from 'react'
import { Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { stackDefaultOptions } from '../helpers'
import I18n from '../i18n/i18n'
import { colors, theme } from '../styles/theme'

import Home from '../screens/home/Home'
import ToolList from '../screens/toolList/ToolList'
import ToolDetail from '../screens/toolDetail/ToolDetail'
import DailyReport from '../screens/toolDetail/DailyReport'
import ToolReport from '../screens/toolDetail/ToolReport'
import ToolChangeOver from '../screens/toolDetail/ToolChangeOver'
import ToolDowntime from '../screens/toolDetail/ToolDowntime'
import SafetyDevices from '../screens/checklist/SafetyDevices'

const routeConfig = {
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  ToolListModal: {
    screen: new StackNavigator(
      {
        ToolList: {
          screen: ToolList,
          navigationOptions: {
            header: null
        }
    },
    ToolListModal: {
        screen: new StackNavigator({
            ToolList: {
                screen: ToolList,
                navigationOptions: {
                    header: null,
                }
            },
            ToolDetail: {
                screen: ToolDetail,
                navigationOptions: {
                    header: null,
                }
            },
        }, {
            initialRouteName: 'ToolList'
        }),
        navigationOptions: {
            header: null,
        }
    },
    ToolDetail: {
        screen: ToolDetail,
        navigationOptions: {
            header: null,
        }
    },
    DailyReport: {
        screen: DailyReport,
        navigationOptions: {
            header: null,
        }
    },
    ToolReport: {
        screen: ToolReport,
        navigationOptions: {
            header: null,
        }
    },
    ToolChangeOver: {
        screen: ToolChangeOver,
        navigationOptions: {
            header: null,
        }
    },
    ToolDowntime: {
        screen: ToolDowntime,
        navigationOptions: {
            header: null,
        }
    },
    LastShiftModal: {
        screen: LastShiftLog,
        navigationOptions: {
            header: null,
            mode: 'modal',
        }
    },
    ChecklistModal: {
        screen: Checklist,
        navigationOptions: {
            header: null
        }
    },
    NewReportModal: {
        screen: ReportFailure,
        navigationOptions: {
            header: null
        }
    },
    IdentifyFailureModal: {
        screen: IdentifyFailure,
        navigationOptions: {
            header: null
        }
    },
    SafetyDevicesModal: {
        screen: SafetyDevices,
        navigationOptions: {
            header: null
        }
    },
    ExternalChecklistModal: {
        screen: ExternalChecklist,
        navigationOptions: {
            header: null
        }
    },
    MergeDowntime: {
        screen: MergeDowntime,
        navigationOptions: {
            header: null
        }
    },
    SplitDowntime: {
        screen: SplitDowntime,
        navigationOptions: {
            header: null
          }
        }
      },
      {
        initialRouteName: "ToolList"
      }
    ),
    navigationOptions: {
      header: null
    }
  },
  ToolDetail: {
    screen: ToolDetail,
    navigationOptions: {
      header: null
    }
  },
  DailyReport: {
    screen: DailyReport,
    navigationOptions: {
      header: null
    }
  },
  ToolReport: {
    screen: ToolReport,
    navigationOptions: {
      header: null
    }
  },
  ToolChangeOver: {
    screen: ToolChangeOver,
    navigationOptions: {
      header: null
    }
  },
  ToolDowntime: {
    screen: ToolDowntime,
    navigationOptions: {
      header: null
    }
  },
  SafetyDevicesModal: {
    screen: SafetyDevices,
    navigationOptions: {
      header: null
    }
  },
};

export default new StackNavigator(routeConfig, stackDefaultOptions('Home'))