from urllib.parse import urlencode

from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import EnquirySerializer


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def enquiry_view(request):
    serializer = EnquirySerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    data = serializer.validated_data

    message = "\n".join([
        "Hello Jai Tech Laundry, I would like to enquire.",
        "",
        f"Name: {data['name']}",
        f"Phone: {data['phone']}",
        f"Email: {data['email'] or 'Not provided'}",
        f"Service: {data['service']}",
        "",
        f"Details: {data['message'] or 'Not provided'}",
    ])

    query = urlencode({
        "phone": "971508551051",
        "text": message,
    })

    return Response(
        {
            "whatsapp_url": f"https://api.whatsapp.com/send?{query}",
            "message": "Your enquiry is ready to send in WhatsApp.",
        },
        status=status.HTTP_200_OK,
    )