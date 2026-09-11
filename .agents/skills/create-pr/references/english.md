# English pull request procedure

Use this procedure when the user asks to “create a pull request” or explicitly asks for an English version.

Inspect the repository before creating the PR: confirm the current branch is not the intended base branch, check the working tree and commits that will be included, and identify the repository's normal base branch. Preserve unrelated user changes.

Write the PR title and body in English. Summarize the user-visible change and list verification actually performed. Use the repository's contribution/PR template when present. Do not claim tests or checks that were not run.

Create the PR only after the branch is ready and pushed. Use the configured GitHub remote and state the resulting PR URL. If the base branch, scope, or authentication cannot be resolved safely, ask the user or report the blocker instead of selecting a target arbitrarily.
