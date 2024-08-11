import {
  CampaignCreated as CampaignCreatedEvent,
  CheckOut as CheckOutEvent,
  HostReviewed as HostReviewedEvent,
  SingedOut as SingedOutEvent,
  SingedUp as SingedUpEvent,
  UserCreated as UserCreatedEvent
} from "../generated/RealizeIT/RealizeIT";
import {
  CampaignCreated,
  CheckOut,
  HostReviewed,
  SingedOut,
  SingedUp,
  UserCreated
} from "../generated/schema";

export function handleCampaignCreated(event: CampaignCreatedEvent): void {
  let entity = new CampaignCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.host = event.params.host;
  entity.pricePool = event.params.pricePool;
  entity.maxQuota = event.params.maxQuota;
  entity.currentQuota = event.params.currentQuota;
  entity.checkouts = event.params.checkouts;
  entity.onlyVerified = event.params.onlyVerified;

  entity.hypercertID = event.params.hypercertID;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCheckOut(event: CheckOutEvent): void {
  let entity = new CheckOut(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.hostRate = event.params.hostRate;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.hypercertID = event.params.hypercertID;

  entity.save();
}

export function handleHostReviewed(event: HostReviewedEvent): void {
  let entity = new HostReviewed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.hypercertID = event.params.hypercertID;
  entity.stars = event.params.stars;
  entity.user = event.params.user;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSingedOut(event: SingedOutEvent): void {
  let entity = new SingedOut(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.hypercertID = event.params.hypercertID;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSingedUp(event: SingedUpEvent): void {
  let entity = new SingedUp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.hypercertID = event.params.hypercertID;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}


export function handleUserCreated(
  event: UserCreatedEvent
): void {
  let entity = new UserCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.hypercertID = event.params.hypercertID;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}


// handler: handleSingedUp
// - event: UserCreated(address user, string userName);
//   handler: handleUserCreated
// - event: StarsEarned(address user, uint256 stars);
//   handler: handleStarsEarned
// - event: PointsEarned(address user, uint256 points);
//   handler: handlePointsEarned