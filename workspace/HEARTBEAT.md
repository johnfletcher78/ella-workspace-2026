# HEARTBEAT.md - Atlas System Tasks

## Active Monitoring

- Check sub-agent health every 60s
- Report failures immediately
- Maintain queue depth < 10
- Keep Supabase connection alive

## Weekly Tasks

- Archive completed workflows
- Prune old logs (>30 days)
- Report system metrics to Guardian
- Verify all sub-agents respond

## Skip Conditions

- Queue empty + No active workflows = Skip
- Maintenance mode = Skip all
