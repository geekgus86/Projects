import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'
import Constants from '../Constants'

export const tracker = new GoogleAnalyticsTracker(Constants.GOOGLE_ANALYTICS_ID)