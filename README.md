# PerfexCRM for n8n — Community Node for API & Webhook Workflow Automation

[![npm version](https://badge.fury.io/js/n8n-nodes-perfexcrm.svg "n8n-nodes-perfexcrm on npm")](https://www.npmjs.com/package/n8n-nodes-perfexcrm)
[![GitHub release](https://img.shields.io/github/release/OBSTechnologies/n8n-nodes-perfexcrm.svg "GitHub release version")](https://github.com/OBSTechnologies/n8n-nodes-perfexcrm/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg "MIT License")](https://opensource.org/licenses/MIT)
[![n8n Community Nodes](https://img.shields.io/badge/n8n-Community%20Nodes-orange "n8n community nodes")](https://n8n.io/)

Connect [PerfexCRM](https://www.perfexcrm.com/) to [n8n](https://n8n.io/) with this community node and build no-code / low-code workflow automations across your entire CRM. It ships with **19 PerfexCRM resources**, **176 REST API operations**, and a trigger node with **80 real-time webhook events** — enough coverage to automate leads, tickets, invoices, projects, contracts, subscriptions, and more without writing glue code. Whether you want to sync PerfexCRM data to Slack, Google Sheets, HubSpot, or Mailchimp, push webhook-driven events into any of n8n's 400+ integrations, or orchestrate multi-step CRM workflows, this node is a complete PerfexCRM automation toolkit.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Why use this node?](#why-use-this-node)
- [Prerequisites — PerfexCRM API & Webhooks Module](#prerequisites--perfexcrm-api--webhooks-module)
- [Installation](#installation)
- [PerfexCRM API Operations (19 Resources, 176 Operations)](#perfexcrm-api-operations-19-resources-176-operations)
- [PerfexCRM Trigger Node — 80 Real-Time Webhook Events](#perfexcrm-trigger-node--80-real-time-webhook-events)
- [Authentication & API Credentials](#authentication--api-credentials)
- [Example PerfexCRM Automation Workflows](#example-perfexcrm-automation-workflows)
- [Compatibility & Requirements](#compatibility--requirements)
- [FAQ](#faq)
- [Resources](#resources)
- [Support](#support)
- [Contributing](#contributing)

## Why use this node?

- **Sync PerfexCRM leads and customers** to any tool — Slack, Google Sheets, HubSpot, Mailchimp, Airtable, Notion, or any of n8n's 400+ integrations.
- **Automate invoice and payment notifications** the moment a PerfexCRM invoice is paid, overdue, or cancelled.
- **Route support tickets intelligently** based on department, priority, or customer tier, and page the right team in real time.
- **Trigger workflows from 80+ PerfexCRM webhook events** — from `lead.created` and `invoice.paid` to `contract.expiring` and `task.overdue`.
- **Eliminate manual PerfexCRM admin work** with no-code / low-code automation — no glue scripts, no cron jobs, no duct-taped Zaps.

## Prerequisites — PerfexCRM API & Webhooks Module

**This n8n node requires the PerfexCRM API & Webhooks module to be installed on your PerfexCRM instance.**

### [Purchase the PerfexCRM API & Webhooks Module at perfexapi.com](https://perfexapi.com)

The module provides:
- RESTful API endpoints for all PerfexCRM entities
- Webhook support for real-time events
- API key authentication
- Rate limiting and security features
- Comprehensive documentation

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Manual Installation

1. Clone or download this repository
2. In your n8n installation folder, navigate to `~/.n8n/nodes/`
3. Create a folder called `n8n-nodes-perfexcrm`
4. Copy all files from this repository into that folder
5. Build the node:
   ```bash
   cd ~/.n8n/nodes/n8n-nodes-perfexcrm
   npm install
   npm run build
   ```
6. Restart n8n

## PerfexCRM API Operations (19 Resources, 176 Operations)

### PerfexCRM Action Node — REST API Coverage

**19 resources** with **176 operations** covering the entire PerfexCRM API.

| Resource | Ops | Operations |
|----------|:---:|------------|
| **Customer** | 10 | Create, Get, Get Many, Update, Delete, Get Contacts, Get Contracts, Get Invoices, Get Projects, Get Tickets |
| **Ticket** | 14 | Create, Get, Get Many, Update, Delete, Add Reply, Get Reply, Update Reply, Delete Reply, List Replies, Get Attachments, Get History, Assign, Change Status |
| **Invoice** | 7 | Create, Get, Get Many, Update, Delete, Get Payments, Send |
| **Lead** | 8 | Create, Get, Get Many, Update, Delete, Convert, Get Activities, Get Notes |
| **Project** | 9 | Create, Get, Get Many, Update, Delete, Get Activity, Get Files, Get Milestones, Get Tasks |
| **Contract** | 11 | Create, Get, Get Many, Update, Delete, Sign, Get Attachments, Get Comments, Get Expired, Get Expiring, Renew |
| **Task** | 22 | Create, Get, Get Many, Update, Delete, Assign, Change Status, Mark Complete, Get Attachments, List Comments, Add Comment, List Timesheets, Add Timesheet, List Checklist, Add Checklist Item, Get Checklist Item, Update Checklist Item, Delete Checklist Item, Change Priority, List Followers, Add Follower, Remove Follower |
| **Expense** | 6 | Create, Get, Get Many, Update, Delete, Get Categories |
| **Estimate** | 8 | Create, Get, Get Many, Update, Delete, Send, Convert, Get PDF |
| **Staff** | 14 | Create, Get, Get Many, Update, Delete, Activate, Deactivate, Get Permissions, Get Departments, Get Roles, Get Department List, Change Password, Get Tasks, Get Timesheets |
| **Proposal** | 11 | Create, Get, Get Many, Update, Delete, Send, Accept, Decline, List Comments, Add Comment, Get PDF |
| **Credit Note** | 10 | Create, Get, Get Many, Update, Delete, Add Refund, List Refunds, Apply Credit, List Credits, Get PDF |
| **Subscription** | 5 | Create, Get, Get Many, Update, Delete |
| **Item** | 6 | Create, Get, Get Many, Update, Delete, Get Groups |
| **Payment** | 5 | Create, Get, Get Many, Update, Delete |
| **Contact** | 5 | Create, Get, Get Many, Update, Delete |
| **Timesheet** | 5 | Create, Get, Get Many, Update, Delete |
| **Note** | 5 | Create, Get, Get Many, Update, Delete |
| **Utility** | 10 | Get Currencies, Get Taxes, Get Departments, Get Payment Modes, Get Countries, Get Ticket Statuses, Get Ticket Priorities, Get Lead Statuses, Get Lead Sources, Get Contract Types |

### PerfexCRM Trigger Node — 80 Real-Time Webhook Events

Listen for webhooks from PerfexCRM and start n8n workflows the instant something happens in your CRM — no polling required.

#### Supported Events (80 webhook events)

| Category | Events |
|----------|--------|
| **Contact** | created, deleted, updated |
| **Contract** | cancelled, created, deleted, expired, expiring, signed, updated |
| **Credit Note** | created, credits_applied, deleted, refund_created, sent, status_changed, updated |
| **Customer** | contact_added, created, deleted, status_changed, updated |
| **Estimate** | accepted, converted, created, declined, deleted, expiring, sent, updated |
| **Expense** | created, deleted, updated |
| **Invoice** | cancelled, created, deleted, overdue, paid, sent, status_changed, updated |
| **Item** | created, deleted, updated |
| **Lead** | assigned, converted, created, status_changed, updated |
| **Note** | created, deleted, updated |
| **Payment** | created, deleted, updated |
| **Project** | completed, created, status_changed, updated |
| **Proposal** | accepted, comment_added, converted, created, declined, deleted, sent, updated |
| **Staff** | activated, created, deactivated, deleted, login, password_changed, permissions_changed, updated |
| **Subscription** | created |
| **Task** | assigned, comment_added, completed, created, deleted, overdue, priority_changed, status_changed, timesheet_added, updated |
| **Ticket** | assigned, attachment_added, closed, created, deleted, priority_changed, reopened, reply_added, status_changed, updated |
| **Timesheet** | created, deleted, updated |

## Authentication & API Credentials

You'll need to enter the following credentials to use this node:

1. **Base URL**: The URL of your PerfexCRM installation (e.g., `https://your-perfex.com`)
2. **API Key**: Your PerfexCRM API key (starts with `pk_`)
3. **API Version**: The API version to use (currently only `v1` is supported)

### Getting your PerfexCRM API Key

1. Log in to your PerfexCRM admin panel
2. Navigate to **Setup** > **API & Webhooks**
3. Click on **API Keys**
4. Create a new API key with the appropriate permissions
5. Copy the API key (you'll only see it once!)

## Example PerfexCRM Automation Workflows

### Lead to Customer Automation
When a new lead is created in PerfexCRM, automatically score it, convert qualifying leads to customers, spin up a dedicated project, draft a welcome invoice, and fire a personalised onboarding email via Gmail or SendGrid. Eliminates the manual hand-off between sales and delivery.

### Invoice Payment Tracking
Subscribe to the `invoice.paid` and `invoice.overdue` webhook events, push paid invoices to your accounting system (QuickBooks, Xero, or a Google Sheet), and alert your finance team in Slack or Microsoft Teams the moment an invoice goes overdue. Cash flow visibility without a single manual check.

### Support Ticket Routing
Automatically triage every new PerfexCRM ticket: route VIP customers to senior staff, page on-call engineers for P1 priorities, assign by department keyword, and post a digest of open tickets to a Slack channel each morning. A support inbox that sorts itself.

### Customer Onboarding
Build an end-to-end onboarding workflow: create the PerfexCRM customer record, create a matching project and initial milestones, generate and send the first invoice, provision accounts in third-party tools (Stripe, HubSpot, Intercom), and deliver a branded welcome package — all triggered by one webhook.

## Compatibility & Requirements

- n8n version 0.180.0 or later
- PerfexCRM 2.3.x or later
- PerfexCRM API & Webhooks Module (required)

## FAQ

### Is this an official n8n node?
No. `n8n-nodes-perfexcrm` is a community node built and maintained by [OBS Technologies](https://obstechnologies.com). It is installable on any self-hosted n8n instance via the Community Nodes feature.

### Do I need the PerfexCRM API & Webhooks module?
Yes. This node talks to the PerfexCRM REST API exposed by the [PerfexCRM API & Webhooks module](https://perfexapi.com). Without it installed on your PerfexCRM instance, neither the action node nor the trigger node can reach your data.

### Which PerfexCRM versions are supported?
PerfexCRM 2.3.x and later. Older PerfexCRM versions may work for read-only operations but are not officially tested.

### Can I use this node on n8n Cloud?
Not yet. Community nodes only run on self-hosted n8n by default. We're working towards [verified community node](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/) status, which would unlock n8n Cloud availability.

### How do I get a PerfexCRM API key?
In your PerfexCRM admin panel, go to **Setup → API & Webhooks → API Keys**, create a new key with the permissions you need, and copy the value (shown once). See [Authentication & API Credentials](#authentication--api-credentials) for details.

### What PerfexCRM events can trigger an n8n workflow?
80 webhook events across 18 categories — leads, customers, invoices, tickets, tasks, contracts, projects, proposals, estimates, payments, subscriptions, and more. See the [full event table](#supported-events-80-webhook-events).

### Does this node support PerfexCRM custom fields?
Yes. Custom fields are passed through on create and update operations, and are returned in the payload on read operations and webhook events.

### Is there a rate limit?
Rate limiting is handled by the PerfexCRM API & Webhooks module itself. n8n will surface the HTTP 429 responses if you exceed your configured rate limit so you can implement retries.

## Resources

* [Purchase PerfexCRM API & Webhooks Module](https://perfexapi.com)
* [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
* [PerfexCRM API Documentation](https://your-perfex.com/admin/api_webhooks/documentation)
* [GitHub Repository](https://github.com/OBSTechnologies/n8n-nodes-perfexcrm)
* [npm Package](https://www.npmjs.com/package/n8n-nodes-perfexcrm)

## Support

### For n8n Node Issues:
- [Open an issue on GitHub](https://github.com/OBSTechnologies/n8n-nodes-perfexcrm/issues)
- [n8n Community Forum](https://community.n8n.io/)

### For PerfexCRM API & Webhooks Module:
- [Support at perfexapi.com](https://perfexapi.com)
- Email: support@obstechnologies.com

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author

**OBS Technologies**
- Website: [obstechnologies.com](https://obstechnologies.com)
- PerfexCRM Modules: [perfexapi.com](https://perfexapi.com)
- GitHub: [@OBSTechnologies](https://github.com/OBSTechnologies)

## License

[MIT](https://github.com/OBSTechnologies/n8n-nodes-perfexcrm/blob/main/LICENSE) (c) OBS Technologies

---

**Built for the n8n community by [OBS Technologies](https://obstechnologies.com)** — specialists in PerfexCRM automation, custom CRM integrations, and workflow engineering.

If you find this node useful, please star it on [GitHub](https://github.com/OBSTechnologies/n8n-nodes-perfexcrm)!
