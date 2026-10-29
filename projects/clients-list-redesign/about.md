# Clients list redesign

A client list for a bank's relationship managers that does more than list names. It sorts each manager's clients into Premium, New and Dormant, so they can see who joined this week and who they haven't spoken to in months – and check in before those clients drift away.

This is an example prototype. Nothing here comes from research yet; the [project facts](#/playground/clients-list-redesign/facts) say what we're assuming and what we still need to find out.

## The list

The main screen, on desktop. Search sits above the segment tabs, and each tab shows its count. Each row shows what the client holds with the bank and when the manager last spoke to them. Below the list, a tip points at dormant clients and suggests a short check-in.

![Clients list](screens/desktop/ClientsListPrototypePage.tsx)

## On a phone

The same list in the app's Clients tab. Segments scroll sideways, and an assistant button floats above the tab bar.

![Clients list mobile](screens/mobile/ClientsListMobilePage.tsx)

For a step-by-step walk through what's on this screen and why, open the [Clients list storyboard](#/playground/clients-list-redesign/storyboard/clients-list-mobile).

## How a manager uses it

From opening the list to checking in with a dormant client.

![Client segments flow](docs/discovery/client-segments-flow.mermaid)

## States

The same screen, started in a different place.

![Dormant segment](screens/desktop/ClientsListPrototypePage.tsx?initialSegment=dormant)

![No clients yet](screens/desktop/ClientsListPrototypePage.tsx?clients=none)

![No matches](screens/desktop/ClientsListPrototypePage.tsx?initialQuery=Olivia)

## Layout options

3 ways to lay out the same rows – one card with dividers, a flat list, and a card per client. The single card won and is what the main screen uses.

![Clients list layout fork](screens/desktop/ClientsListLayoutForkPage.tsx)
