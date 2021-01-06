//
//  YellowMessengerModule.swift
//  ymhost
//
//  Created by G Srinivasa on 02/01/21.
//

import Foundation
import UIKit
// Counter.swift
import Foundation
@objc(YellowMessengerModule)
class YellowMessengerModule: RCTViewManager {
  public static let shared = YellowMessengerModule()
  
  //public static let shared = YellowMessengerModule()
  var configData: [String : String]
  var payloadData: String

  public let events : EventManager
  var window : UIWindow
  override public init(){
      self.configData = Dictionary<String, String>()
      self.payloadData = ""
      self.events = EventManager()
      self.window = UIWindow()
    
  }
  
  public func initPlugin(config : Dictionary<String, String>) {
      self.configData = config
  }
  
  public func startChatBot(view : UIView){
      let chatViewer = ChatController()
      guard let windowScene = view.window?.windowScene else { return }
      let window = UIWindow(windowScene: windowScene)
      window.rootViewController = chatViewer
      self.window = window
      window.makeKeyAndVisible()
  }
  
  public func stopChatBot(){
      self.window.rootViewController = nil
  }
  
  public func setPayload(payload: Dictionary<String, String>) {
          payloadData = "%7B"
       payload.forEach({ (key: String, value: String) in
          payloadData += "%22\(key)%22:%22\(value)%22,"
      })
      payloadData += "%22Platform%22:%22iOS-App%22%7D"
  }
  
  @objc public  func initializeYM(_ userID: String, accessT accessToken: String, refreshT refreshToken: String, mob mobileNumber: String, slug journalSlug: String, state userState: String){
      //Set Configuration data
      let config:[String:String] = ["BotId" : userID]
      var sender:UIView = UIView()
      if let topVC = UIApplication.getPresentedViewController() {
           sender = topVC.view
      }

      //Initialize the plugin with config values.
      YellowMessengerModule.shared.initPlugin(config: config) //Step 1

      //Set EventListener to handle bot events.
      YellowMessengerModule.shared.events.listenTo(eventName: "BotEvent", action: {
          (information:Any?) in
          if let info = information as? Dictionary<String, String> {
              print("Closing Bot")
              //To stop chatbot use the following function
              YellowMessengerModule.shared.stopChatBot() //Step 5
              switch info["code"] {
              case "login-user":
                  //Each event has two keys, "code" and "data". Use info["code"] or info["data"] to access the values
                  //The following code restarts the chatbot with different payload values.
                  let payloads:[String:String] = ["UserState":"LoggedIn"]
                  Self.shared.setPayload(payload: payloads)
                  Self.shared.startChatBot(view: sender)
              //Add other cases acording to need.
              default:
                  print("Unknown Event")
              }
          }
      }) // Step 2
      
      //Setting payload values
      let payloads:[String:String] = ["UserState":userState]

      //Pass payload to the bot
      YellowMessengerModule.shared.setPayload(payload: payloads) //Step 3
    
    
  }
  
  @objc public func invokeChatBot(){
      var sender:UIView = UIView()
      if let topVC = UIApplication.getPresentedViewController() {
           sender = topVC.view
      }
      //Start the chatbot webview
        DispatchQueue.main.async {
        YellowMessengerModule.shared.startChatBot(view: sender) //Step 4
      }
  }
   
    override static func requiresMainQueueSetup() -> Bool {
    return true
    }
  
  
}

extension UIApplication {

    class func getTopViewController(base: UIViewController? = UIApplication.shared.keyWindow?.rootViewController) -> UIViewController? {

        if let nav = base as? UINavigationController {
            return getTopViewController(base: nav.visibleViewController)

        } else if let tab = base as? UITabBarController, let selected = tab.selectedViewController {
            return getTopViewController(base: selected)

        } else if let presented = base?.presentedViewController {
            return getTopViewController(base: presented)
        }
        return base
    }
  
  class func getPresentedViewController() -> UIViewController? {
    var presentViewController = UIApplication.shared.keyWindow?.rootViewController
    while let pVC = presentViewController?.presentedViewController
    {
        presentViewController = pVC
    }

    return presentViewController
  }
}

