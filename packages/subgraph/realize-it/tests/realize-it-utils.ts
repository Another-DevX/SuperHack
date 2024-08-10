import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CampaignCreated,
  CheckOut,
  HostReviewed,
  SingedOut,
  SingedUp
} from "../generated/RealizeIT/RealizeIT"

export function createCampaignCreatedEvent(
  host: Address,
  pricePool: BigInt,
  maxQuota: BigInt,
  currentQuota: BigInt,
  checkouts: BigInt,
  onlyVerified: boolean
): CampaignCreated {
  let campaignCreatedEvent = changetype<CampaignCreated>(newMockEvent())

  campaignCreatedEvent.parameters = new Array()

  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam("host", ethereum.Value.fromAddress(host))
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "pricePool",
      ethereum.Value.fromUnsignedBigInt(pricePool)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxQuota",
      ethereum.Value.fromUnsignedBigInt(maxQuota)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "currentQuota",
      ethereum.Value.fromUnsignedBigInt(currentQuota)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "checkouts",
      ethereum.Value.fromUnsignedBigInt(checkouts)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "onlyVerified",
      ethereum.Value.fromBoolean(onlyVerified)
    )
  )

  return campaignCreatedEvent
}

export function createCheckOutEvent(
  user: Address,
  hypercertID: BigInt,
  hostRate: i32
): CheckOut {
  let checkOutEvent = changetype<CheckOut>(newMockEvent())

  checkOutEvent.parameters = new Array()

  checkOutEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  checkOutEvent.parameters.push(
    new ethereum.EventParam(
      "hypercertID",
      ethereum.Value.fromUnsignedBigInt(hypercertID)
    )
  )
  checkOutEvent.parameters.push(
    new ethereum.EventParam(
      "hostRate",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(hostRate))
    )
  )

  return checkOutEvent
}

export function createHostReviewedEvent(
  hypercertID: BigInt,
  stars: Array<i32>,
  user: Address
): HostReviewed {
  let hostReviewedEvent = changetype<HostReviewed>(newMockEvent())

  hostReviewedEvent.parameters = new Array()

  hostReviewedEvent.parameters.push(
    new ethereum.EventParam(
      "hypercertID",
      ethereum.Value.fromUnsignedBigInt(hypercertID)
    )
  )
  hostReviewedEvent.parameters.push(
    new ethereum.EventParam("stars", ethereum.Value.fromI32Array(stars))
  )
  hostReviewedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return hostReviewedEvent
}

export function createSingedOutEvent(
  user: Address,
  hypercertID: BigInt
): SingedOut {
  let singedOutEvent = changetype<SingedOut>(newMockEvent())

  singedOutEvent.parameters = new Array()

  singedOutEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  singedOutEvent.parameters.push(
    new ethereum.EventParam(
      "hypercertID",
      ethereum.Value.fromUnsignedBigInt(hypercertID)
    )
  )

  return singedOutEvent
}

export function createSingedUpEvent(
  user: Address,
  hypercertID: BigInt
): SingedUp {
  let singedUpEvent = changetype<SingedUp>(newMockEvent())

  singedUpEvent.parameters = new Array()

  singedUpEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  singedUpEvent.parameters.push(
    new ethereum.EventParam(
      "hypercertID",
      ethereum.Value.fromUnsignedBigInt(hypercertID)
    )
  )

  return singedUpEvent
}
