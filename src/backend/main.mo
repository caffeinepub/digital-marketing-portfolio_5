import Int "mo:core/Int";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

actor {
  type Inquiry = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Inquiry {
    public func compare(x : Inquiry, y : Inquiry) : Order.Order {
      Int.compare(x.timestamp, y.timestamp);
    };
  };

  let inquiries = Map.empty<Text, Inquiry>();

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text) : async () {
    let timestamp = Time.now();
    let inquiry : Inquiry = {
      name;
      email;
      message;
      timestamp;
    };
    if (inquiries.containsKey(name)) { Runtime.trap("An inquiry with this name already exists. Please use a unique name."); };
    inquiries.add(name, inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray().sort().reverse();
  };
};
