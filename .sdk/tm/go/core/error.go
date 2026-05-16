package core

type UselessFactsError struct {
	IsUselessFactsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewUselessFactsError(code string, msg string, ctx *Context) *UselessFactsError {
	return &UselessFactsError{
		IsUselessFactsError: true,
		Sdk:              "UselessFacts",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *UselessFactsError) Error() string {
	return e.Msg
}
