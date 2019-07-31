#Persistent

SetTimer,UPDATEDSCRIPT,1000
SetTimer,CHECKCORNER,1000

WasInCorner:=0

UPDATEDSCRIPT:
FileGetAttrib,attribs,%A_ScriptFullPath%
IfInString,attribs,A
{
FileSetAttrib,-A,%A_ScriptFullPath%
Sleep,500
Reload
}

CHECKCORNER:
InCorner:=(MouseX < 10) and (MouseY > ScreenY - 10)

CoordMode, Mouse, Screen
MouseGetPos, MouseX, MouseY
SysGet, ScreenY, 17
if (global WasInCorner=0) and (InCorner=1) {
	MouseMove,0,0,0,R ; mouse pointer stays in place but sends a mouse event
	SysGet, Coord, MonitorWorkArea, 1
	Gui, +LastFound +AlwaysOnTop +Toolwindow -Caption
	Gui, Color, Red
	Gui, Show, x0 y-%coordbottom% w%coordright% h%coordbottom%
	; 'Show' the gui off the screen, then change the region, then move it to the screen = no flicker.
	WinSet, Region, % "0-0 0-" CoordBottom " " CoordRight "-" CoordBottom " " CoordRight
	. "-0 0-0 2-2 " CoordRight-2 "-2 " CoordRight-2 "-" CoordBottom-2 " 2-" CoordBottom-2 " 2-2 0-0"
	Gui, Show, x0 y0
	; SetTimer, ColorChange, 10
	return

	ColorChange:
	SetFormat, IntegerFast, H
	r := Round( 127 * Sin(A_TickCount / 1000 ) ) + 128
	g := Round( 127 * Cos( A_TickCount / 1300 ) ) + 128
	b := Round( 185.65 * ATan( 5 * Cos( A_TickCount / 1700 )**2 ) )
	Gui, Color, % ( r << 16 ) | ( g << 8 ) | b
	global WasInCorner:=1
} Else If (InCorner=0) {
	global WasInCorner:=0
	Gui, Cancel
}
Return