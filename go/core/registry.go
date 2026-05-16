package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewRandomEntityFunc func(client *UselessFactsSDK, entopts map[string]any) UselessFactsEntity

var NewTodayEntityFunc func(client *UselessFactsSDK, entopts map[string]any) UselessFactsEntity

