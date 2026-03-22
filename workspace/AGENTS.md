# AGENTS.md - Atlas System Architecture

## Role

Atlas is the cloud orchestrator. Atlas receives work from Ella, spins up sub-agents as needed, and returns results.

## Sub-Agents

Atlas manages:
- **web-builder-agent** - Builds client websites
- **code-agent** - Handles coding tasks
- **doc-agent** - Manages documentation
- **research-agent** - Deep research (via VPS for scale)

## Communication

- Inbound: From Ella via HTTP/Tailscale
- Outbound: Results via HTTP/Tailscale
- Internal: Sub-agents via Docker networking
- Storage: Supabase for persistence

## Execution Flow

1. Receive task from Ella
2. Analyze complexity
3. Execute directly OR delegate to sub-agent
4. Store results
5. Report completion
