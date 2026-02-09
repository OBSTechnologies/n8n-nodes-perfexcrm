# n8n-nodes-perfexcrm

[![npm version](https://badge.fury.io/js/n8n-nodes-perfexcrm.svg)](https://www.npmjs.com/package/n8n-nodes-perfexcrm)
[![GitHub release](https://img.shields.io/github/release/OBSTechnologies/n8n-nodes-perfexcrm.svg)](https://github.com/OBSTechnologies/n8n-nodes-perfexcrm/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n Community Nodes](https://img.shields.io/badge/n8n-Community%20Nodes-orange)](https://n8n.io/)

This is an n8n community node. It lets you use PerfexCRM in your n8n workflows.

PerfexCRM is a powerful customer relationship management system. This node allows you to interact with the PerfexCRM API and receive webhooks for real-time events.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## 🛒 Prerequisites - PerfexCRM API & Webhooks Module

**This n8n node requires the PerfexCRM API & Webhooks module to be installed on your PerfexCRM instance.**

### 👉 [Purchase the PerfexCRM API & Webhooks Module at perfexapi.com](https://perfexapi.com)

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

## Operations

### PerfexCRM Node

**15 resources** with **131+ operations** covering the entire PerfexCRM API.

| Resource | Ops | Operations |
|----------|:---:|------------|
| 👤 **Customer** | 5 | Create, Get, Get Many, Update, Delete |
| 🎫 **Ticket** | 14 | Create, Get, Get Many, Update, Delete, Add Reply, Assign, Change Status, Get Notes, Add Note, List Comments, Add Comment, Get Attachments, Get Statuses |
| 💰 **Invoice** | 9 | Create, Get, Get Many, Update, Delete, Send, Get Payments, Record Payment, Get PDF |
| 🎯 **Lead** | 6 | Create, Get, Get Many, Update, Delete, Convert |
| 📁 **Project** | 8 | Create, Get, Get Many, Update, Delete, Get Members, Get Milestones, Get Tasks |
| 📄 **Contract** | 11 | Create, Get, Get Many, Update, Delete, Sign, Get Attachments, Get Comments, Get Expired, Get Expiring, Renew |
| ✅ **Task** | 18 | Create, Get, Get Many, Update, Delete, Assign, Change Status, Mark Complete, Get Attachments, List Comments, Add Comment, List Timesheets, Add Timesheet, List Checklist, Add Checklist Item, Get Checklist Item, Update Checklist Item, Delete Checklist Item |
| 💸 **Expense** | 5 | Create, Get, Get Many, Update, Delete |
| 📋 **Estimate** | 9 | Create, Get, Get Many, Update, Delete, Send, Convert, Accept, Decline |
| 👥 **Staff** | 5 | Create, Get, Get Many, Update, Delete |
| 📝 **Proposal** | 9 | Create, Get, Get Many, Update, Delete, Send, Convert, Accept, Decline |
| 💳 **Credit Note** | 9 | Create, Get, Get Many, Update, Delete, Add Refund, List Refunds, Apply Credit, List Credits |
| 🔄 **Subscription** | 5 | Create, Get, Get Many, Update, Delete |
| 📦 **Item** | 3 | Get, Get Many, Get Groups |
| 🔧 **Utility** | 10 | Get Currencies, Get Taxes, Get Departments, Get Payment Modes, Get Countries, Get Ticket Statuses, Get Ticket Priorities, Get Lead Statuses, Get Lead Sources, Get Contract Types |

### PerfexCRM Trigger Node

This trigger node listens for webhooks from PerfexCRM and starts workflows when events occur:

#### Supported Events
- Customer events (created, updated, deleted)
- Contact events (created, updated, deleted)
- Lead events (created, updated, converted, deleted)
- Invoice events (created, updated, paid, overdue, deleted)
- Payment events (recorded, failed)
- Proposal events (created, sent, accepted, declined)
- Estimate events (created, sent, accepted, declined, converted)
- Contract events (created, signed, expiring, expired)
- Project events (created, updated, completed)
- Task events (created, updated, completed, comment added)
- Ticket events (created, updated, status changed, reply added, assigned, closed)
- Staff events (created, login)
- Expense events (created, updated)

## Credentials

You'll need to enter the following credentials to use this node:

1. **Base URL**: The URL of your PerfexCRM installation (e.g., `https://your-perfex.com`)
2. **API Key**: Your PerfexCRM API key (starts with `pk_`)
3. **API Version**: The API version to use (currently only `v1` is supported)

### Getting your API Key

1. Log in to your PerfexCRM admin panel
2. Navigate to **Setup** → **API & Webhooks**
3. Click on **API Keys**
4. Create a new API key with the appropriate permissions
5. Copy the API key (you'll only see it once!)

## Example Workflows

### 🎯 Lead to Customer Automation
Automatically convert leads to customers when they meet certain criteria, create a project, and send a welcome email.

### 💰 Invoice Payment Tracking
Track invoice payments in real-time, update your accounting system, and notify your team.

### 🎫 Support Ticket Routing
Automatically assign tickets based on department, priority, or customer type, and send notifications to the right team members.

### 📊 Customer Onboarding
Create a complete onboarding workflow: create customer, setup project, generate first invoice, and send welcome materials.

## Compatibility

- ✅ n8n version 0.180.0 or later
- ✅ PerfexCRM 2.3.x or later
- ✅ PerfexCRM API & Webhooks Module (required)

## Resources

* 🛒 [Purchase PerfexCRM API & Webhooks Module](https://perfexapi.com)
* 📚 [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
* 📖 [PerfexCRM API Documentation](https://your-perfex.com/admin/api_webhooks/documentation)
* 🔧 [GitHub Repository](https://github.com/OBSTechnologies/n8n-nodes-perfexcrm)
* 📦 [npm Package](https://www.npmjs.com/package/n8n-nodes-perfexcrm)

## Support

### For n8n Node Issues:
- 🐛 [Open an issue on GitHub](https://github.com/OBSTechnologies/n8n-nodes-perfexcrm/issues)
- 💬 [n8n Community Forum](https://community.n8n.io/)

### For PerfexCRM API & Webhooks Module:
- 🛒 [Support at perfexapi.com](https://perfexapi.com)
- 📧 Email: support@obstechnologies.com

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

[MIT](https://github.com/OBSTechnologies/n8n-nodes-perfexcrm/blob/main/LICENSE) © OBS Technologies

---

**Made with ❤️ by [OBS Technologies](https://obstechnologies.com)**

⭐ If you find this node useful, please star it on [GitHub](https://github.com/OBSTechnologies/n8n-nodes-perfexcrm)!