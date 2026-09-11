# Agent Instructions

## Operational Commands

- 의존성은 `bun install`로만 설치한다. `bun.lock`을 사용하므로 npm, yarn, pnpm을 사용하지 않는다.
- 개발 서버: `bun run dev`
- API 서버만 실행: `bun run server`
- 전체 테스트: `bun run test`
- 감시 테스트: `bun run test:watch`
- 정적 검사: `bun run lint`
- 프로덕션 빌드: `bun run build`

## TDD Rule

**이 규칙은 Rigid — 상황에 맞게 변형하지 마라.** 하위 디렉토리의 `AGENTS.md`에 별도 TDD 규칙이 있으면 그 규칙이 우선한다. 이 섹션은 전역 기본값(fallback)이다.

### 적용 기준

**반드시 TDD를 적용한다:** 비즈니스 로직, API, 유틸리티 함수, 버그 수정.

**TDD가 불필요하다:** 타입 정의, 설정 파일, 순수 UI 스타일·마크업, SQL.

### RED-GREEN-REFACTOR

1. **RED:** 하나의 동작에 하나의 테스트만 작성한다. 반드시 실행해 실패를 확인하고, 실패 이유가 **기능 미구현**인지 확인한다.
2. **GREEN:** 테스트를 통과시키는 최소한의 코드만 작성한다. YAGNI를 지키고 신규·기존 테스트 전체가 통과하는지 확인한다.
3. **REFACTOR:** 중복 제거, 이름 개선, 헬퍼 추출만 수행한다. 테스트는 계속 green 상태여야 하며, 새 동작을 추가하지 않는다.
4. **반복:** 다음 동작에 대한 RED로 돌아간다.

### 삭제 강제 규칙

- 테스트 전에 프로덕션 코드를 먼저 작성했다면 **반드시 삭제**하고 RED부터 다시 시작한다.
- 해당 코드를 **참고용으로 남기는 것도 금지**한다.

### 변명 차단

| 변명 | 반론 |
| --- | --- |
| 너무 단순해서 테스트 불필요 | 단순한 동작도 요구사항과 회귀 방지 계약이다. RED부터 작성한다. |
| 나중에 추가하겠다 | 구현 시점의 요구사항을 검증하지 않으면 나중의 테스트는 사후 추측이 된다. 지금 작성한다. |
| 시간이 없다 | 테스트 없이 진행하면 검증과 회귀 비용이 뒤로 밀릴 뿐이다. 범위를 줄이고 RED부터 진행한다. |
| 삭제하면 낭비 | 선작성 코드는 검증되지 않은 가설이다. 삭제 후 테스트로 요구사항을 확정한다. |
| 프로토타입이다 | 프로토타입도 동작 계약이 필요하다. 적용 대상이면 TDD를 생략하지 않는다. |

## Golden Rules

### Immutable

- AI 생성 결과는 `react-live`의 `noInline` 모드에서 실행된다. 생성 프롬프트와 정규화 로직을 수정할 때는 최종 코드에 `render(<Component />)` 호출이 남도록 유지한다. 근거: `server/index.ts:10-20`, `server/generator.ts:13-23`, `src/components/LivePreview.tsx:14-18`.
- API 키는 서버 환경변수 `ANTHROPIC_API_KEY` 또는 `GOOGLE_API_KEY`에서만 읽고, 클라이언트 번들·응답·로그에 추가로 노출하지 않는다. 근거: `server/index.ts:59-65`, `server/index.ts:147-156`.

### Do's and Don'ts

- Google 모델 목록을 바꾸면 순서대로 실패를 흡수하는 폴백 계약을 유지하고 테스트를 갱신한다. 근거: `server/index.ts:4-5`, `server/index.ts:134-136`, `server/fallback.ts:1-19`, `server/fallback.test.ts`.
- 모델 응답 형식이나 코드 정규화를 바꾸면 `stripCodeFences`와 `ensureRenderCall`의 단위 테스트를 함께 수정한다. 근거: `server/generator.ts:5-23`, `server/generator.test.ts`.
- 생성 요청의 실패를 새 예외로 바꿀 때 `429`와 `503`의 사용자용 상태 코드를 일반 `500` 처리로 합치지 않는다. 근거: `server/index.ts:191-211`.
- UI 생성 요청은 훅을 통해 `/api/generate`로 보내고, 성공한 결과만 컴포넌트 목록에 추가한다. 근거: `src/hooks/useComponentGenerator.ts:18-48`.

## Project Context

프롬프트로 독립적인 React UI 코드를 생성하고 즉시 미리보기·복사할 수 있는 로컬 워크벤치다.

React 19, TypeScript, Vite, Bun, Vitest, react-live, Anthropic Messages API, Google Generative Language API.

## Standards and References

- TypeScript와 JSX는 기존 코드의 세미콜론·작은따옴표 스타일을 따른다.
- 커밋 메시지는 한국어 Conventional Commit 형식(`feat:`, `fix:`, `refactor:`, `chore:`)을 쓴다.
- 코드와 이 규칙의 근거가 어긋나면 변경 전에 `AGENTS.md` 갱신을 제안한다.

## Context Map

- **[Bun API·AI 공급자 수정](./server/AGENTS.md)** — API 계약, 모델 폴백, 생성 코드 정규화 작업 시.
- **[React UI·상태·미리보기 수정](./src/AGENTS.md)** — 컴포넌트, 훅, 스타일, 프런트엔드 테스트 작업 시.
