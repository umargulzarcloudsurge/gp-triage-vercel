import { withAuth } from "next-auth/middleware"

export default withAuth(
	function middleware(req) {
	},
	{
		callbacks: {
			authorized: ({ token }) => {
				if (token) {
					return true
				}
				return false;
			},
		},
	}
)

export const config = {
	matcher: [
		"/api/charts",
		"/api/admin-request/admin-request-by-patient",
		"/api/admin-request/admin-request-by-status",
		"/api/admin-request/admin-request-by-type",
		"/api/admin-request/admin-total-request",
		"/api/bookings-summary/appointment-type",
		"/api/bookings-summary/get-booking-count",
		"/api/bookings-summary/get-patients-count",
		"/api/bookings-summary/get-symptoms-count",
		"/api/bookings-summary/over-the-time",
		"/api/bookings-summary/service-type",
		"/api/bookings-summary/symptoms",
		"/api/bookings-summary/triage-as",
		"/api/calender/get-booking-summaries",
		"/api/get-next-record",
	]
}
