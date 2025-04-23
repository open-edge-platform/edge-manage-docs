Add Registry
=======================

If you want to pull Docker\* images or Helm\* charts from a public location,
such as Docker Hub or a corporate registry, you can add the registry in
|software_prod_name| using the **Add Registry** feature.

To add a registry, do the following:

1. On the **Applications** page, click the **Registries** tab.

#. On the **Registries** page, click **Add Registry**. The **Add a Registry** page appears:

   .. figure:: images/add_registry.png
      :scale: 80 %
      :alt: Add Registry Page

#. Enter the registry name in the **Registry Name** field. Intel recommends assigning a
   meaningful name that will help you remember the registry.
   The name field can include letters, numbers, and hyphens. Hyphens,
   if used, must not be located at the beginning or the end of the name.

#. Enter the URL of the chart and image contents from the registry in the **Location** field.

#. In the **Inventory** field, enter the URL to request a chart list from Helm
   registries. It is not used for Docker registries. Note that this URL is
   separate from the location URL.

#. Select if the type of registry is **Helm*** or **Docker**.

#. Enter the **Username** and **Password** of the registry if required.
   The **Password** may be the actual password or an authentication token.

#. Click **OK**.
