# Frontend Instructions

## Module Context

React 앱은 프롬프트·공급자 설정을 받아 생성 API를 호출하고, 생성 결과를 메모리 목록에서 미리보기와 코드 탭으로 제공한다.

## Tech Stack and Constraints

- React 19, TypeScript, Vite, react-live를 사용한다.
- 미리보기는 `LiveProvider`의 `noInline` 모드이므로 서버가 전달한 `render()` 호출에 의존한다. 근거: `components/LivePreview.tsx:14-18`.
- API 경로는 `/api`로 유지한다. 개발 중에는 Vite 프록시가 Bun 서버로 전달한다. 근거: `hooks/useComponentGenerator.ts:23-27`, `../vite.config.ts`.

## Implementation Patterns

- 생성 요청 상태와 결과 목록 변경은 `useComponentGenerator`에 둔다. 프레젠테이션 컴포넌트는 콜백과 props를 통해 동작한다. 근거: `hooks/useComponentGenerator.ts:13-59`, `components/ComponentCard.tsx`.
- 생성된 결과는 최신 항목이 먼저 보이도록 목록 앞에 추가한다. 근거: `hooks/useComponentGenerator.ts:35-42`.
- 스타일 수정은 CSS 사용자 지정 속성을 통해 다크·라이트 테마 모두 확인한다. 근거: `App.tsx:16-20`, `App.tsx:36-39`, `App.css:1-2`.

## Testing Strategy

- UI 상호작용 변경 후 `bun run test`를 실행한다.
- 프롬프트 입력·제출·로딩 상태는 `components/PromptInput.test.tsx`와 같은 Testing Library 패턴으로 검증한다.

## Local Golden Rules

- 생성 중에는 중복 제출을 막는 `isLoading` 계약을 유지한다. 근거: `hooks/useComponentGenerator.ts:19,47`, `components/PromptInput.tsx:15-19,41-42`, `components/PromptInput.test.tsx`.
- 재생성 버튼과 입력 폼은 같은 전역 생성 상태를 공유한다. 컴포넌트별 비동기 상태로 바꾸려면 카드와 훅의 API를 함께 변경한다. 근거: `components/ComponentCard.tsx:38-43`, `App.tsx:33,143-149`.
