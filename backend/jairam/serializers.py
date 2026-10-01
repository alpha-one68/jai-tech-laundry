import re

from rest_framework import serializers


class EnquirySerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    phone = serializers.CharField(max_length=32)

    email = serializers.EmailField(
        required=False,
        allow_blank=True,
        default="",
    )

    service = serializers.ChoiceField(choices=[
        "Wash & Fold",
        "Dry Cleaning",
        "Commercial Laundry",
        "Garment Care",
        "Linen Care",
        "Uniform Car",
    ])

    message = serializers.CharField(
        required=False,
        allow_blank=True,
        default="",
        max_length=2000,
    )

    def validate_phone(self, value):
        if not re.fullmatch(r"\+?[0-9 ()\.\-]+", value):
            raise serializers.ValidationError(
                "Enter a valid phone number."
            )

        digits = re.sub(r"[^0-9]", "", value)

        if not 6 <= len(digits) <= 15:
            raise serializers.ValidationError(
                "Phone number must contain 6–15 digits."
            )

        return value