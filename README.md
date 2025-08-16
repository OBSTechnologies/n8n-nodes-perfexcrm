# n8n-nodes-perfexcrm

This is an n8n community node. It lets you use PerfexCRM in your n8n workflows.

PerfexCRM is a powerful customer relationship management system. This node allows you to interact with the PerfexCRM API and receive webhooks for real-time events.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

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

This node allows you to perform CRUD operations on various PerfexCRM resources:

#### Customers
- Create a new customer
- Get a customer by ID
- Get all customers with filters
- Update a customer
- Delete a customer

#### Tickets
- Create a new ticket
- Get a ticket by ID
- Get all tickets with filters
- Update a ticket
- Delete a ticket
- Add a reply to a ticket

#### Invoices
- Create a new invoice
- Get an invoice by ID
- Get all invoices with filters

#### Leads
- Create a new lead
- Get a lead by ID
- Convert a lead to customer

#### Projects
- Create a new project
- Get a project by ID

#### Contracts
- Create a new contract
- Get a contract by ID

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

## Compatibility

- Requires n8n version 0.180.0 or later
- Tested with PerfexCRM 2.3.x and later

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [PerfexCRM API Documentation](https://your-perfex.com/admin/api_webhooks/documentation)

## Support

For issues specific to this node, please create an issue in this repository.

For general n8n support, visit the [n8n community forum](https://community.n8n.io/).

## License

[MIT](https://github.com/your-org/n8n-nodes-perfexcrm/blob/master/LICENSE.md)