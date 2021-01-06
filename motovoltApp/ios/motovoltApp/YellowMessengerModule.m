//
//  YellowMessengerModule.m
//  ymhost
//
//  Created by G Srinivasa on 02/01/21.
//

#import <Foundation/Foundation.h>


#import "React/RCTBridgeModule.h"
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(YellowMessengerModule, RCTViewManager)

RCT_EXTERN_METHOD(initializeYM:(NSString)userID accessT:(NSString)accessToken refreshT:(NSString)refreshToken mob:(NSString)mobileNumber slug: (NSString)journalSlug state:(NSString)userState)

RCT_EXTERN_METHOD(invokeChatBot)

@end
