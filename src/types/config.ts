export interface ISessionConfig {
  sessionDuration: number; // 20-90 (minutes)
  maxVideos: number; // 5-15
  idleTimeout: number; // 5-15 (minutes)
  accountId?: string;
}
export interface ISearchStateConfig extends IEvaluateSearchVideoConfig {
  probInputCorrect: number;
  keywords: string[];
}

export interface IEvaluateSearchVideoConfig {
  probSearchVideoGood: number;
  probWatchIfGoodSearch: number;
  probWatchIfBadSearch: number;
}

export interface IEvaluateWatchDirectVideoConfig {
  probDirectVideoGood: number;
  probWatchIfGoodDirect: number;
  probWatchIfBadDirect: number;
}

export interface IWatchVideoConfig {
  probAd: number;
  probSkipAd: number;
  minViewPercent: number;
  maxViewPercent: number;
  probPauseOrSeek: number;
  pauseDuration: number;
  seekDuration: number;
  forward: number;
  probConsiderInteract: number;
  probStopEarly: number;
  probLike: number;
  probComment: number;
  probSubscribe: number;
}

export interface IWatchVideoResult {
  reason?: string;
  videoInfo?: any;
  watchedSeconds?: number;
  watchedPercentage?: number;
  allowInteraction?: boolean;
  error?: any;
}

export interface IAppConfig {
  probHomeBrowsing: number;
  probSearch: number;
  probWatchDirect: number;
  probChannelBrowse: number;
  probEndSessionNow: number;
}

export interface IEvaluateHomeVideoConfig {
  probHomeVideoGood: number;
  probWatchIfGoodHome: number;
  probWatchIfBadHome: number;
}

export interface IHomeConfig extends IEvaluateHomeVideoConfig {
  probCheckNotifications: number;
  probPauseOnVideo: number;
  probMaxScroll: number;
}

export interface IDetermineActionConfig extends IWatchVideoConfig {
  watchSuggested: number;
  backToSearchResults: number;
  newSearch: number;
  viewCurrentChannel: number;
  endSessionEarly: number;
}

export interface IChannelConfig {
  probScrollChannelVideo: number;
  probReadChannelInfo: number;
  probPickChannelVideo: number;
}

export type Action =
  | "None"
  | "watchVideo"
  | "homeBrowsing"
  | "endNow"
  | "viewChannel"
  | "Search"
  | "newSearch"
  | "Error"
  | "Like"
  | "Comment"
  | "Subscribe"
  | "CheckNoti"
  | "WatchVidBad"
  | "WatchVidGood"
  | "SkipAd"
  | "clickHome"
  | "playVideo"
  | "skipWatchVideo"
  | "endHomeBrowseEarly"
  | "WatchDirect"
  | "endSession"
  | "CheckAds"
  | "watchedVideo"
  | "MainProcess";

export type StateName =
  | "MainProcess"
  | "Search"
  | "WatchVideo"
  | "Home"
  | "Channel"
  | "HomeBrowsing"
  | "WatchDirect"
  | "EndSession";
export interface IResultState {
  action: Action;
  data?: any;
  error?: any;
  stateName?: StateName;
}
