# CLAUDE.md - Atlas Principles

## Infrastructure Principles

### One Service, One Manager
- Docker Compose manages all Atlas services
- No host systemd services for containerized workloads
- Clear ownership: Docker owns Atlas stack

### Security
- Tailscale for all internal communication
- No public ports except necessary webhooks
- Secrets in environment, never in code

### Execution
- Queue-based task processing
- Sub-agents for parallelization
- Fail fast, retry with backoff
- Stateless where possible, state in Supabase

## Deployment

Atlas runs entirely in Docker:
- atlas-orchestrator
- sub-agents (as needed)
- supporting services (Redis, etc.)
