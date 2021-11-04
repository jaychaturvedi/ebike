//
//  Events.swift
//
//  Created by Priyank Upadhyay on 24/02/20.
//  Copyright © 2020 Priyank Upadhyay. All rights reserved.
//

import Foundation

public class EventManager {
    public var listeners = Dictionary<String, NSMutableArray>();
    
    public func listenTo(eventName:String, action: @escaping (()->())) {
        let newListener = EventListenerAction(callback: action);
        addListener(eventName: eventName, newEventListener: newListener);
    }
    public func listenTo(eventName:String, action: @escaping ((Any?)->())) {
        let newListener = EventListenerAction(callback: action);
        addListener(eventName: eventName, newEventListener: newListener);
    }
    
    internal func addListener(eventName:String, newEventListener:EventListenerAction) {
        if let listenerArray = self.listeners[eventName] {
            listenerArray.add(newEventListener);
        }
        else {
            self.listeners[eventName] = [newEventListener] as NSMutableArray;
        }
    }
    
    public func removeListeners(eventNameToRemoveOrNil:String?) {
        if let eventNameToRemove = eventNameToRemoveOrNil {
            
            if let actionArray = self.listeners[eventNameToRemove] {
                actionArray.removeAllObjects();
            }
        }
        else {
            self.listeners.removeAll(keepingCapacity: false);
        }
    }

    public func trigger(eventName:String, information:Any? = nil) {
        if let actionObjects = self.listeners[eventName] {
            for actionObject in actionObjects {
                if let actionToPerform = actionObject as? EventListenerAction {
                    if let methodToCall = actionToPerform.actionExpectsInfo {
                        methodToCall(information);
                    }
                    else if let methodToCall = actionToPerform.action {
                        methodToCall();
                    }
                }
            }
        }
    }
}

class EventListenerAction {
    let action:(() -> ())?;
    let actionExpectsInfo:((Any?) -> ())?;
    
    init(callback: @escaping (() -> ()) ) {
        self.action = callback;
        self.actionExpectsInfo = nil;
    }
    
    init(callback: @escaping ((Any?) -> ()) ) {
        self.actionExpectsInfo = callback;
        self.action = nil;
    }
}
