---
name: create-pr
description: "Create a GitHub pull request when asked to create a pull request, an English-version pull request, or a Korean-version pull request."
---

# Create PR

Create a pull request for the current project using the language requested by the user.

## Delegation

This project-local skill is available to delegated agents. When assigning PR creation to a subagent, explicitly include `$create-pr` (or this skill's absolute path) in its task so the subagent loads these instructions and the applicable language reference before creating an external PR.

- For “create a pull request” or “create an English version of the pull request,” read and follow [the English procedure](references/english.md).
- For “create a Korean version pull request,” read and follow [the Korean procedure](references/korean.md).

Do not create a PR merely to inspect repository state or draft its contents. Before the external action, ensure the current branch, changes, target base, and PR title/body accurately reflect the user's request. Stop and report any unresolved conflict, missing remote/authentication, or required user decision rather than guessing.
