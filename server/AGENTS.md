# Server Instructions

## Module Context

Bun 서버는 프런트엔드의 `/api` 요청을 Anthropic 또는 Google API로 중계하고, 응답 코드를 react-live 실행 형식으로 정규화한다.

## Tech Stack and Constraints

- Bun의 내장 `fetch`와 `Bun.serve`를 사용한다. 서버 실행은 `bun run server`다.
- 공급자 타입은 `anthropic | google`으로 유지한다. 근거: `index.ts:57`.
- 생성 결과는 import문과 TypeScript 문법 없이, 인라인 스타일과 `render()` 호출을 포함해야 한다. 근거: `index.ts:9-20`.

## Implementation Patterns

- API 계약을 바꾸면 Vite 프록시 대상(`vite.config.ts`)과 프런트엔드 호출 지점도 확인한다.
- 모델 응답의 표현 차이는 공급자 호출 함수에서 처리하고, 공통 후처리는 `stripCodeFences` 후 `ensureRenderCall` 순서로 적용한다. 근거: `index.ts:183-190`.

## Testing Strategy

- 서버 순수 함수 변경 후 `bun run test`를 실행한다.
- 정규화 함수는 `server/generator.test.ts`, 폴백 규칙은 `server/fallback.test.ts`에 테스트를 추가한다.

## Local Golden Rules

- 빈 모델 목록은 오류여야 하며, 폴백은 첫 성공값을 즉시 반환하고 모두 실패하면 마지막 오류를 던진다. 근거: `fallback.ts:7-19`, `fallback.test.ts`.
- Google만 다중 모델 폴백을 사용한다. Anthropic 경로에 같은 동작을 추가하거나 제거할 때는 공급자별 오류·비용 정책을 명시적으로 검토한다. 근거: `index.ts:68-96`, `index.ts:98-136`.
- `/api/config`은 키 존재 여부의 불리언만 반환한다. 키 값 또는 파생 정보를 추가하지 않는다. 근거: `index.ts:147-156`.
